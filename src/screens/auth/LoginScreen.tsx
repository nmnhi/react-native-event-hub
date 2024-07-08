import {View, Text, Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authStyles} from './styles';

const LoginScreen = () => {
  return (
    <View style={authStyles.container}>
      <Text>LoginScreen</Text>
      <Button
        title="Login"
        onPress={async () => await AsyncStorage.setItem('assetToken', 'token')}
      />
    </View>
  );
};

export default LoginScreen;
