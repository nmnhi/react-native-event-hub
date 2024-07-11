import {useNavigation} from '@react-navigation/native';
import {ArrowLeft} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
  back?: boolean;
}

const ContainerComponent = (props: Props) => {
  const {children, isImageBackground, isScroll, back, title} = props;

  const navigation = useNavigation();

  const headerComponent = () => {
    return (
      <View style={{flex: 1}}>
        {(title || back) && (
          <RowComponent
            styles={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              minWidth: 48,
              minHeight: 48,
            }}>
            {back && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{marginRight: 12}}>
                <ArrowLeft size={24} color={appColors.gray} />
              </TouchableOpacity>
            )}
            {title && (
              <TextComponent
                text={title}
                font={fontFamilies.medium}
                size={16}
              />
            )}
          </RowComponent>
        )}

        {returnContainer}
      </View>
    );
  };

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
      <SafeAreaView style={{flex: 1}}>{headerComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      <View>{returnContainer}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
