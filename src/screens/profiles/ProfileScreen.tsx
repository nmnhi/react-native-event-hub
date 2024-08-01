import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {Text, View} from 'react-native';
import {LoginManager} from 'react-native-fbsdk-next';
import {useDispatch} from 'react-redux';
import {ButtonComponent, ContainerComponent} from '../../components';
import {removeAuth} from '../../store/reducers/authReducer';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  // const logOut = async () => {
  //   const auth = useSelector(authSelector);

  //   const data = await AsyncStorage.getItem('auth');
  //   if (data) {
  //     const userObject = JSON.parse(data);
  //     await GoogleSignin.signOut();
  //     await LoginManager.logOut();
  //     await AsyncStorage.setItem(
  //       'auth',
  //       JSON.stringify({email: userObject.email, password: userObject.password})
  //     );
  //   } else {
  //     await AsyncStorage.setItem('auth', JSON.stringify(auth.email));
  //   }

  //   dispatch(removeAuth({}));
  // };

  return (
    <ContainerComponent back>
      <View style={{marginVertical: 60}}>
        <Text>ProfileScreen</Text>
        <ButtonComponent
          text="Logout"
          onPress={async () => {
            await GoogleSignin.signOut();
            await LoginManager.logOut();
            dispatch(removeAuth({}));
          }}
          type="primary"
        />
      </View>
    </ContainerComponent>
  );
};

export default ProfileScreen;
