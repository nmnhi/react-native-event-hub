import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../../apis/authApi';
import {Facebook, Google} from '../../../assets/svgs';
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {addAuth} from '../../../store/reducers/authReducer';

GoogleSignin.configure({
  webClientId:
    '36988978499-c1e751fj5v96e8t89c63edrnvcj3ckv1.apps.googleusercontent.com'
  // offlineAccess: true,
  // scopes: ['profile', 'email']
});

const SocialLogin = () => {
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const api = '/google-login';
      try {
        const res = await authenticationAPI.HandleAuthentication(
          api,
          userInfo.user,
          'post'
        );
        dispatch(addAuth(res.data));
        await AsyncStorage.setItem('auth', JSON.stringify({...res.data}));
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SectionComponent>
      <TextComponent
        text="OR"
        color={appColors.gray4}
        size={16}
        font={fontFamilies.medium}
        styles={{textAlign: 'center'}}
      />
      <SpaceComponents height={16} />

      <ButtonComponent
        onPress={handleLoginWithGoogle}
        type="primary"
        color={appColors.white}
        text="Login with Google"
        icon={<Google width={26} height={26} />}
        iconFlex="left"
        textColor={appColors.text}
        textFont={fontFamilies.regular}
      />

      <ButtonComponent
        type="primary"
        color={appColors.white}
        text="Login with Facebook"
        icon={<Facebook width={26} height={26} />}
        iconFlex="left"
        textColor={appColors.text}
        textFont={fontFamilies.regular}
      />
    </SectionComponent>
  );
};

export default SocialLogin;
