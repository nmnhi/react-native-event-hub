import {View} from 'react-native';
import React, {useState} from 'react';

import {InputComponent} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {Lock, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View
      style={[
        globalStyles.container,
        {alignItems: 'center', justifyContent: 'center', padding: 20},
      ]}>
      <InputComponent
        value={email}
        onChange={value => setEmail(value)}
        placeholder="Email"
        affix={<Sms size={22} color={appColors.gray} />}
        allowClear
      />
      <InputComponent
        value={password}
        onChange={value => setPassword(value)}
        placeholder="Password"
        affix={<Lock size={22} color={appColors.gray} />}
        isPassword
      />
    </View>
  );
};

export default LoginScreen;
