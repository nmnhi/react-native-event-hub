import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import AppRouter from './src/navigators/AppRouter';
import {SplashScreen} from './src/screens';
import store from './src/store/store';

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Provider store={store}>
        {isShowSplash ? (
          <SplashScreen />
        ) : (
          <NavigationContainer>
            <AppRouter />
          </NavigationContainer>
        )}
      </Provider>
    </>
  );
};

export default App;
