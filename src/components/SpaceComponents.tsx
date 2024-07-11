import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  width?: number;
  height?: number;
}

const SpaceComponents = (props: Props) => {
  const {width, height} = props;
  const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
    },
  });

  return <View style={styles.container} />;
};

export default SpaceComponents;
