import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ArrowRight, Lock, Sms} from 'iconsax-react-native';
import {Alert, Image, Switch, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
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
import {addAuth, authSelector} from '../../store/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import {Validate} from '../../utils/validate';
import SplashScreen from '../SplashScreen';
import SocialLogin from './components/SocialLogin';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    const emailValidation = Validate.Email(email);
    const passwordValidation = Validate.Password(password);
    if (email && password && emailValidation && passwordValidation) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [email, password]);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setErrorMessage('');
    const emailValidation = Validate.Email(email);
    const passwordValidation = Validate.Password(password);
    if (emailValidation && passwordValidation) {
      try {
        const resp = await authenticationAPI.HandleAuthentication(
          '/login',
          {email: email, password: password},
          'post'
        );
        dispatch(addAuth(resp.data));
        await AsyncStorage.setItem(
          'auth',
          isRemember
            ? JSON.stringify({...resp.data, password: password})
            : JSON.stringify({...resp.data})
        );
      } catch (error) {
        Alert.alert('Email or password is not correct');
      }
    } else {
      if (!emailValidation) {
        setErrorMessage('Email incorrect format!');
      }

      if (!passwordValidation) {
        setErrorMessage(
          'Length of password need to more than or equal 6 characters'
        );
        ``;
      }
    }
  };

  const getCurrentUser = async () => {
    setIsShowSplash(true);
    const data = await AsyncStorage.getItem('auth');
    if (data) {
      const userData = JSON.parse(data);
      setEmail(userData.email);
      if (userData.password) {
        setPassword(userData.password);
      }
    }
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 200);
    return () => clearTimeout(timeout);
  };

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : (
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
                <SpaceComponents width={4} />
                <TextComponent text="Remember me" />
              </RowComponent>
              <ButtonComponent
                text="Forgot password?"
                onPress={() => navigation.navigate('ForgotPassword')}
                type="text"
              />
            </RowComponent>
          </SectionComponent>
          <SpaceComponents height={16} />
          {errorMessage && (
            <SectionComponent
              styles={{flexDirection: 'row', justifyContent: 'center'}}>
              <TextComponent text={errorMessage} color={appColors.danger} />
            </SectionComponent>
          )}
          <SectionComponent>
            <ButtonComponent
              text="SIGN IN"
              type="primary"
              disable={isDisable}
              onPress={handleLogin}
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
      )}
    </>
  );
};

export default LoginScreen;
