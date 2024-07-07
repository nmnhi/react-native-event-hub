import {View, Text, Button} from 'react-native';
import React from 'react';
import {homeStyles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  return (
    <View style={homeStyles.container}>
      <Text>HomeScreen</Text>
      <Button title="Logout" onPress={async () => await AsyncStorage.clear()} />
    </View>
  );
};

export default HomeScreen;
