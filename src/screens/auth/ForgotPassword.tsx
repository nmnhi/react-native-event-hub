import {useNavigation} from '@react-navigation/native';
import {ArrowRight, Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import authenticationAPI from '../../apis/authApi';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent
} from '../../components';
import {appColors} from '../../constants/appColors';
import {LoadingModal} from '../../modals';
import {globalStyles} from '../../styles/globalStyles';
import {Validate} from '../../utils/validate';

const ForgotPassword = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckEmail = () => {
    const isValidEmail = Validate.Email(email);
    setIsDisable(!isValidEmail);
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    const api = '/forgotPassword';
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        {email: email},
        'post'
      );
      setIsLoading(false);
      Alert.alert('Reset password', res.message, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('LoginScreen')
        }
      ]);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <ContainerComponent back isImageBackground isScroll>
      <SectionComponent>
        <TextComponent
          text="Reset Password"
          title
          styles={{marginBottom: 12}}
        />
        <TextComponent text="Please enter your email address to request a password reset" />
        <SpaceComponents height={26} />
        <InputComponent
          value={email}
          onChange={val => setEmail(val)}
          placeholder="abc@email.com"
          affix={<Sms size={22} color={appColors.gray} />}
          allowClear
          onEnd={handleCheckEmail}
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          disable={isDisable}
          text="SEND"
          type="primary"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {
                  backgroundColor: isDisable
                    ? appColors.gray4
                    : appColors.iconBackgroundColor
                }
              ]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
          iconFlex="right"
          onPress={handleForgotPassword}
        />
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default ForgotPassword;
