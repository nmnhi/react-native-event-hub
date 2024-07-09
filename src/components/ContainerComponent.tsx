import {
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
}

const ContainerComponent = (props: Props) => {
  const {children, isImageBackground, isScroll, title} = props;

  const returnContainer = isScroll ? (
    <ScrollView style={{flex: 1}}>{children}</ScrollView>
  ) : (
    <View style={{flex: 1}}>{children}</View>
  );

  return isImageBackground ? (
    <ImageBackground
      source={require('../assets/images/splash-image.png')}
      style={{flex: 1}}
      imageStyle={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>{returnContainer}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      <View>{returnContainer}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
