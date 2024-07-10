import React, {useEffect, useState} from 'react';

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
import authenticationAPI from '../../apis/authApi';
import {LoadingModal} from '../../modals';
import {Validate} from '../../utils/validate';

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (values.email || values.password || values.confirmPassword) {
      setErrorMessage('');
    }
  }, [values.email, values.password, values.confirmPassword]);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;

    setValues(data);
  };

  const handleRegister = async () => {
    const {email, password, confirmPassword} = values;
    const emailValidation = Validate.Email(email);
    const passwordValidation = Validate.Password(password);
    const isMatched = Validate.ConfirmPassword(password, confirmPassword);

    if (email && password && confirmPassword) {
      if (emailValidation && passwordValidation && isMatched) {
        setErrorMessage('');
        setIsLoading(true);
        try {
          const res = await authenticationAPI.HandleAuthentication(
            '/register',
            {
              fullName: values.username,
              email: values.email,
              password: values.password,
            },
            'post',
          );
          console.log(res);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      } else {
        if (!emailValidation) {
          setErrorMessage('Email incorrect format!');
        }

        if (!passwordValidation) {
          setErrorMessage(
            'Length of password need to more than or equal 6 characters',
          );
        } else {
          setErrorMessage('Confirm password do not match with password');
        }
      }
    } else {
      setErrorMessage('Please enter require information!');
    }
  };

  return (
    <>
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
        {errorMessage && (
          <SectionComponent
            styles={{flexDirection: 'row', justifyContent: 'center'}}>
            <TextComponent text={errorMessage} color={appColors.danger} />
          </SectionComponent>
        )}
        <SpaceComponents height={16} />
        <SectionComponent>
          <ButtonComponent
            text="SIGN UP"
            type="primary"
            onPress={handleRegister}
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
