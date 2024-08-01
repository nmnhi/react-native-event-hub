import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {appColors} from '../constants/appColors';

interface Props {
  size?: number;
  children: React.ReactNode;
  color?: string;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
}

const CircleComponent = (props: Props) => {
  const {
    size = 40,
    children,
    color = appColors.primary,
    onPress,
    styles
  } = props;

  const localStyle: ViewStyle = {
    width: size,
    height: size,
    backgroundColor: color,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  };

  return onPress ? (
    <TouchableOpacity style={[localStyle, styles]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[localStyle, styles]}>{children}</View>
  );
};

export default CircleComponent;
