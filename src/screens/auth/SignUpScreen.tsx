import React, {useState} from 'react';

import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent,
} from '../../components';
import {Lock, Sms, User} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import SocialLogin from './components/SocialLogin';

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;

    setValues(data);
  };

  return (
    <ContainerComponent isImageBackground isScroll back>
      <SectionComponent>
        <TextComponent text="Sign up" title />
        <SpaceComponents height={21} />
        <InputComponent
          value={values.username}
          onChange={value => handleChangeValue('username', value)}
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
        />
        <InputComponent
          value={values.password}
          onChange={value => handleChangeValue('password', value)}
          placeholder="Your password"
          affix={<Lock size={22} color={appColors.gray} />}
          isPassword
        />
        <InputComponent
          value={values.confirmPassword}
          onChange={value => handleChangeValue('confirmPassword', value)}
          placeholder="Confirm password"
          affix={<Lock size={22} color={appColors.gray} />}
          isPassword
        />
      </SectionComponent>
      <SpaceComponents height={16} />
      <SectionComponent>
        <ButtonComponent
          text="SIGN UP"
          type="primary"
          onPress={() => navigation.navigate('Verification')}
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
  );
};

export default SignUpScreen;
