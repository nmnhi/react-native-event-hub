import React from 'react';
import {ActivityIndicator, Image, ImageBackground} from 'react-native';
import {SpaceComponents} from '../components';
import {appColors} from '../constants/appColors';
import {styles} from './styles';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/splash-image.png')}
      style={styles.container}
      imageStyle={styles.imageStyle}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.image}
      />
      <SpaceComponents height={16} />
      {/* Loading icon */}
      <ActivityIndicator color={appColors.gray} size={22} />
    </ImageBackground>
  );
};

export default SplashScreen;
