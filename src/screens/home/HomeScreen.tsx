import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeAuth} from '../../store/reducers/authReducer';
import {homeStyles} from './styles';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const logOut = async () => {
    await AsyncStorage.clear();
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
