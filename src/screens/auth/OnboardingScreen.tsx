import {View, Image, TouchableOpacity, Text} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import Swiper from 'react-native-swiper';
import {authStyles} from './styles';
import {appColors} from '../../constants/appColors';

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
          <Text style={[authStyles.textControlSkip]}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')
          }>
          <Text style={[authStyles.textControlNext]}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
