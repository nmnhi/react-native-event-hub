import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {homeStyles} from './styles';

const HomeScreen = () => {
  return (
    <View style={homeStyles.container}>
      <Text>HomeScreen</Text>
      <Button title="Logout" onPress={async () => await AsyncStorage.clear()} />
    </View>
  );
};

export default HomeScreen;
