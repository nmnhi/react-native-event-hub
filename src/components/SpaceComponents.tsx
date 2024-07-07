import {StyleSheet, View} from 'react-native';
import React from 'react';

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
