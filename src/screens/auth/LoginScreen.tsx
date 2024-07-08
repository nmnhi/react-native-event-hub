import {View, Text, Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authStyles} from './styles';
import {ButtonComponent} from '../../components';

const LoginScreen = () => {
  return (
    <View style={authStyles.container}>
      <Text>LoginScreen</Text>
      {/* <Button
        title="Login"
        onPress={async () => await AsyncStorage.setItem('assetToken', 'token')}
      /> */}
      <ButtonComponent
        text="Login"
        type="link"
        onPress={() => console.log('Login')}
        icon={
          <View>
            <Text>N</Text>
          </View>
        }
      />
    </View>
  );
};

export default LoginScreen;
