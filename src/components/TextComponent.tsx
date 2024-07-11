import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
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
}

const TextComponent = (props: Props) => {
  const {text, size, flex, font, color, title, styles} = props;

  return (
    <Text
      style={[
        globalStyles.text,
        {
          color: color ? color : appColors.text,
          flex: flex ? flex : 0,
          fontSize: size ? size : title ? 24 : 14,
          fontFamily: font
            ? font
            : title
            ? fontFamilies.medium
            : fontFamilies.regular,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
