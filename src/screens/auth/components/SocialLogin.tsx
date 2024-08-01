import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useState} from 'react';
import {
  AccessToken,
  LoginManager,
  Profile,
  Settings
} from 'react-native-fbsdk-next';
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
import {LoadingModal} from '../../../modals';
import {addAuth} from '../../../store/reducers/authReducer';

// SETTING LOGIN WITH GOOGLE
GoogleSignin.configure({
  webClientId:
    '36988978499-c1e751fj5v96e8t89c63edrnvcj3ckv1.apps.googleusercontent.com',
  iosClientId:
    '36988978499-h2lkcbnn01tcciksajcqk0lbh02ugcof.apps.googleusercontent.com'
});

// SETTING LOGIN WITH FACEBOOK
Settings.setAppID('1488143919249749');

const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const api = '/google-login';
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

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

  const handleLoginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email'
      ]);

      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (data) {
          setIsLoading(true);
          const response = await fetch(
            `https://graph.facebook.com/me?fields=id,name,email&access_token=${data.accessToken}`
          );
          const userInfo = await response.json();
          const profile = await Profile.getCurrentProfile();
          if (profile) {
            const userData = {
              name: profile.name,
              givenName: profile.firstName,
              familyName: profile.lastName,
              photo: profile.imageURL,
              email: userInfo.email ?? profile.userID
            };
            const res = await authenticationAPI.HandleAuthentication(
              api,
              userData,
              'post'
            );

            dispatch(addAuth(res.data));
            await AsyncStorage.setItem('auth', JSON.stringify({...res.data}));
          }
          setIsLoading(false);
        }
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
        onPress={handleLoginWithFacebook}
      />
      <LoadingModal visible={isLoading} />
    </SectionComponent>
  );
};

export default SocialLogin;
