import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {Text, View} from 'react-native';
import {LoginManager} from 'react-native-fbsdk-next';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../../store/reducers/authReducer';

const ProfileScreen = () => {
  const logOut = async () => {
    const dispatch = useDispatch();
    const auth = useSelector(authSelector);

    const data = await AsyncStorage.getItem('auth');
    if (data) {
      const userObject = JSON.parse(data);
      await GoogleSignin.signOut();
      await LoginManager.logOut();
      await AsyncStorage.setItem(
        'auth',
        JSON.stringify({email: userObject.email, password: userObject.password})
      );
    } else {
      await AsyncStorage.setItem('auth', JSON.stringify(auth.email));
    }

    dispatch(removeAuth({}));
  };

  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
