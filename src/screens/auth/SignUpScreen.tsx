import {ArrowRight, Lock, Sms, User} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../apis/authApi';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent
} from '../../components';
import {appColors} from '../../constants/appColors';
import {LoadingModal} from '../../modals';
import {globalStyles} from '../../styles/globalStyles';
import {Validate} from '../../utils/validate';
import SocialLogin from './components/SocialLogin';

const initValue = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isDisable, setIsDisable] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !errorMessage ||
      (errorMessage &&
        (errorMessage.email ||
          errorMessage.password ||
          errorMessage.confirmPassword)) ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errorMessage]);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[key] = value;

    setValues(data);
  };

  const formValidator = (key: string) => {
    const data = {...errorMessage};
    let message = '';
    switch (key) {
      case 'email':
        if (!values.email) {
          message = 'Email is required!';
        } else if (!Validate.Email(values.email)) {
          message = 'Email incorrect format!';
        } else {
          message = '';
        }
        break;
      case 'password':
        if (!values.password) {
          message = 'Password is required!';
        } else if (!Validate.Password(values.password)) {
          message =
            'Length of password need to more than or equal 6 characters!';
        } else {
          message = '';
        }
        break;
      case 'confirmPassword':
        const isMatched = Validate.ConfirmPassword(
          values.password,
          values.confirmPassword
        );
        if (!values.confirmPassword) {
          message = 'Confirm password is required!';
        } else if (!isMatched) {
          message = 'Password and Confirm Password do not match!';
        } else {
          message = '';
        }
        break;
      default:
        return null;
    }
    data[key] = message;
    setErrorMessage(data);
  };

  const handleRegister = async () => {
    const api = '/verification';
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {email: values.email},
        'post'
      );
      setIsLoading(false);
      navigation.navigate('Verification', {
        code: res.data.code,
        ...values
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ContainerComponent isImageBackground isScroll back>
        <SectionComponent>
          <TextComponent text="Sign up" title />
          <SpaceComponents height={21} />
          <InputComponent
            value={values.name}
            onChange={value => handleChangeValue('name', value)}
            placeholder="Full name"
            affix={<User size={22} color={appColors.gray} />}
            allowClear
          />
          <InputComponent
            value={values.email}
            onChange={value => handleChangeValue('email', value)}
            placeholder="Email"
            affix={<Sms size={22} color={appColors.gray} />}
            allowClear
            onEnd={() => formValidator('email')}
          />

          <InputComponent
            value={values.password}
            onChange={value => handleChangeValue('password', value)}
            placeholder="Your password"
            affix={<Lock size={22} color={appColors.gray} />}
            isPassword
            onEnd={() => formValidator('password')}
          />
          <InputComponent
            value={values.confirmPassword}
            onChange={value => handleChangeValue('confirmPassword', value)}
            placeholder="Confirm password"
            affix={<Lock size={22} color={appColors.gray} />}
            isPassword
            onEnd={() => formValidator('confirmPassword')}
          />
        </SectionComponent>
        {errorMessage &&
          (errorMessage.email ||
            errorMessage.password ||
            errorMessage.confirmPassword) && (
            <SectionComponent
              styles={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              {Object.keys(errorMessage).map(
                (error, index) =>
                  errorMessage[error] && (
                    <TextComponent
                      text={errorMessage[error]}
                      key={`error${index}`}
                      color={appColors.danger}
                    />
                  )
              )}
            </SectionComponent>
          )}
        <SpaceComponents height={16} />
        <SectionComponent>
          <ButtonComponent
            text="SIGN UP"
            type="primary"
            onPress={handleRegister}
            disable={isDisable}
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
          />
        </SectionComponent>
        <SocialLogin />
        <SectionComponent>
          <RowComponent justify="center">
            <TextComponent
              text="Already have an account?"
              styles={{marginRight: 4}}
            />
            <ButtonComponent
              type="link"
              text="Sign in"
              onPress={() => navigation.navigate('LoginScreen')}
            />
          </RowComponent>
        </SectionComponent>
      </ContainerComponent>
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default SignUpScreen;
