import AsyncStorage from '@react-native-async-storage/async-storage';
import {ArrowRight} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../apis/authApi';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {LoadingModal} from '../../modals';
import {addAuth} from '../../store/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';

const Verification = ({navigation, route}: any) => {
  const {code, email, password, username} = route.params;

  const [codeFromServer, setCodeFromServer] = useState<string>('');
  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [codeUserInput, setCodeUserInput] = useState<string>('');
  const [limit, setLimit] = useState<number>(120);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  const dispatch = useDispatch();

  const minutes = Math.floor(limit / 60);
  const seconds = limit % 60;

  useEffect(() => {
    setCodeFromServer(code);
    ref1.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage('');
    let code = '';
    codeValues.forEach(value => {
      code += value;
    });
    setCodeUserInput(code);
  }, [codeValues]);

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit(limit => limit - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [limit]);

  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValues];
    data[index] = val;
    setCodeValues(data);
  };

  const handleResendVerificationCode = async () => {
    const api = '/verification';
    setIsLoading(true);
    setCodeValues(['', '', '', '']);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post'
      );
      setLimit(120);
      setCodeFromServer(res.data.code);
      setIsLoading(false);
    } catch (error) {
      console.log('Cannot send verification code');
      setIsLoading(false);
    }
  };

  const handleVerification = async () => {
    if (limit > 0) {
      if (codeUserInput !== codeFromServer.toString()) {
        setErrorMessage('Invalid verification code');
      } else {
        handleRegister();
      }
    } else {
      setErrorMessage('Verification code timeout. Please resend new code');
    }
  };

  const handleRegister = async () => {
    const api = '/register';
    const data = {
      username: username ?? '',
      email,
      password
    };
    setIsLoading(true);

    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        data,
        'post'
      );
      dispatch(addAuth(res.data));
      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
      setIsLoading(false);
    } catch (error) {
      setErrorMessage('Email has been registered');
      setIsLoading(false);
    }
  };

  return (
    <ContainerComponent back isImageBackground isScroll>
      <SectionComponent>
        <TextComponent text="Verification" title />
        <SpaceComponents height={12} />
        <TextComponent
          // Replace the characters 0 to 5 via character *
          text={`We've send you the verification code on email address ${email.replace(
            /.{1,5}/,
            (n: any) => '*'.repeat(n.length)
          )}`}
        />

        <SpaceComponents height={26} />

        <RowComponent justify="space-around">
          <TextInput
            keyboardType="number-pad"
            ref={ref1}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
            value={codeValues[0]}
            onChangeText={val => {
              handleChangeCode(val, 0);
              val.length > 0 && ref2.current.focus();
            }}
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref2}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
            value={codeValues[1]}
            onChangeText={val => {
              handleChangeCode(val, 1);
              val.length > 0 && ref3.current.focus();
            }}
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref3}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
            value={codeValues[2]}
            onChangeText={val => {
              handleChangeCode(val, 2);
              val.length > 0 && ref4.current.focus();
            }}
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref4}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
            value={codeValues[3]}
            onChangeText={val => {
              handleChangeCode(val, 3);
            }}
          />
        </RowComponent>
      </SectionComponent>

      <SpaceComponents height={32} />

      <SectionComponent>
        <ButtonComponent
          text="CONTINUE"
          type="primary"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {
                  backgroundColor:
                    codeUserInput.length !== 4
                      ? appColors.gray4
                      : appColors.iconBackgroundColor
                }
              ]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
          iconFlex="right"
          disable={codeUserInput.length !== 4}
          onPress={handleVerification}
        />
      </SectionComponent>
      {errorMessage && (
        <SectionComponent>
          <TextComponent
            text={errorMessage}
            flex={0}
            styles={{textAlign: 'center', color: appColors.danger}}
          />
        </SectionComponent>
      )}
      <SectionComponent>
        {limit > 0 ? (
          <RowComponent justify="center">
            <TextComponent text="Resend code in " flex={0} />
            <TextComponent
              text={`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
              color={appColors.link}
              flex={0}
            />
          </RowComponent>
        ) : (
          <RowComponent justify="center">
            <ButtonComponent
              text="Resend email verification"
              type="link"
              onPress={handleResendVerificationCode}
            />
          </RowComponent>
        )}
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default Verification;

const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    textAlign: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: fontFamilies.bold,
    fontSize: 24
  }
});
