import {View, Text} from 'react-native';
import React from 'react';

import {authStyles} from './styles';
import {ButtonComponent} from '../../components';

const LoginScreen = () => {
  return (
    <View style={authStyles.container}>
      <Text>LoginScreen</Text>
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
