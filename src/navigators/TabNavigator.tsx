import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import EventNavigator from './EventNavigator';
import ExploreNavigator from './ExploreNavigator';
import MapNavigator from './MapNavigator';
import ProfileNavigator from './ProfileNavigator';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Events" component={EventNavigator} />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
