import React from 'react';
import {Platform, StyleProp, Text, TextStyle} from 'react-native';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
  numberOfLine?: number;
}

const TextComponent = (props: Props) => {
  const {text, size, flex, font, color, title, styles, numberOfLine} = props;

  const fontDefault = Platform.OS === 'ios' ? 14 : 14;

  return (
    <Text
      numberOfLines={numberOfLine}
      style={[
        globalStyles.text,
        {
          color: color ? color : appColors.text,
          flex: flex ? flex : 0,
          fontSize: size ? size : title ? 24 : fontDefault,
          fontFamily: font
            ? font
            : title
            ? fontFamilies.medium
            : fontFamilies.regular
        },
        styles
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
