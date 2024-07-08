import {View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import Swiper from 'react-native-swiper';
import {authStyles} from './styles';
import {appColors} from '../../constants/appColors';
import {TextComponent} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';

const OnboardingScreen = ({navigation}: any) => {
  const [index, setIndex] = useState(0);

  return (
    <View style={[globalStyles.container]}>
      <Swiper
        style={{}}
        loop={false}
        index={index}
        onIndexChanged={num => setIndex(num)}
        activeDotColor={appColors.white}
        dotColor={appColors.gray}>
        <Image
          source={require('../../assets/images/onboarding1.png')}
          style={authStyles.swiperImage}
        />
        <Image
          source={require('../../assets/images/onboarding2.png')}
          style={authStyles.swiperImage}
        />
        <Image
          source={require('../../assets/images/onboarding3.png')}
          style={authStyles.swiperImage}
        />
      </Swiper>
      <View style={[authStyles.swiperControl]}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <TextComponent
            text="Skip"
            font={fontFamilies.medium}
            color={appColors.gray2}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')
          }>
          <TextComponent
            text="Next"
            color={appColors.white}
            font={fontFamilies.medium}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
