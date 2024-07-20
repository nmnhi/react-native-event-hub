import React, {useState} from 'react';

import {Lock, Sms} from 'iconsax-react-native';
import {Image, Switch} from 'react-native';
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
import SocialLogin from './components/SocialLogin';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);

  const handleLogin = async () => {
    try {
      const resp = await authenticationAPI.HandleAuthentication('/hello');
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75
        }}>
        <Image
          source={require('../../assets/images/text-logo.png')}
          style={{width: 162, height: 114, marginBottom: 30}}
          resizeMode="contain"
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent text="Sign in" title />
        <SpaceComponents height={21} />
        <InputComponent
          value={email}
          onChange={value => setEmail(value)}
          placeholder="Email"
          affix={<Sms size={22} color={appColors.gray} />}
          allowClear
        />
        <InputComponent
          value={password}
          onChange={value => setPassword(value)}
          placeholder="Password"
          affix={<Lock size={22} color={appColors.gray} />}
          isPassword
        />
        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
            />
            <TextComponent text="Remember me" styles={{marginLeft: 4}} />
          </RowComponent>
          <ButtonComponent
            text="Forgot password?"
            onPress={() => navigation.navigate('ForgotPassword')}
            type="text"
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponents height={16} />
      <SectionComponent>
        <ButtonComponent text="SIGN IN" type="primary" onPress={handleLogin} />
      </SectionComponent>
      <SocialLogin />
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent
            text="Don't have an account?"
            styles={{marginRight: 4}}
          />
          <ButtonComponent
            type="link"
            text="Sign up"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
