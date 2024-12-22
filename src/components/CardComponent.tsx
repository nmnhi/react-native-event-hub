import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  onPress: () => void;
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
}

const CardComponent = (props: Props) => {
  const {onPress, children, styles} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[globalStyles.card, globalStyles.shadow, {}, styles]}>
      {children}
    </TouchableOpacity>
  );
};

export default CardComponent;
