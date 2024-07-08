import {StyleProp, ViewStyle, TouchableOpacity, TextStyle} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponent from './TextComponent';

interface Props {
  icon?: ReactNode;
  text: string;
  type: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyles?: StyleProp<TextStyle>;
  iconFlex?: 'right' | 'left';
  onPress?: () => void;
}

const ButtonComponent = (props: Props) => {
  const {
    icon,
    text,
    type,
    color,
    styles,
    textColor,
    textStyles,
    iconFlex,
    onPress,
  } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      {icon && iconFlex === 'left' && icon}
      <TextComponent text={text} color={textColor} styles={textStyles} />
      {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
