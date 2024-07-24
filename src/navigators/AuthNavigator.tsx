import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ForgotPassword,
  LoginScreen,
  SignUpScreen,
  Verification
} from '../screens';
import OnboardingScreen from '../screens/auth/OnboardingScreen';

const AuthNavigator = () => {
  const [isExistingUser, setIsExistingUser] = useState(true);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    checkUserExisting();
  }, []);

  const checkUserExisting = async () => {
    const res = await AsyncStorage.getItem('auth');
    !res && setIsExistingUser(false);
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      {!isExistingUser && (
        <Stack.Screen name="OnBoardingScreen" component={OnboardingScreen} />
      )}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
