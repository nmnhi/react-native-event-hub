import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../../store/reducers/authReducer';
import {homeStyles} from './styles';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  const logOut = async () => {
    const data = await AsyncStorage.getItem('auth');
    if (data) {
      const userObject = JSON.parse(data);
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
    <View style={homeStyles.container}>
      <Text>HomeScreen</Text>
      <Button title="Logout" onPress={async () => logOut()} />
    </View>
  );
};

export default HomeScreen;
