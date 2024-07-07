import {StyleSheet} from 'react-native';
import {appInfo} from '../constants/appInfos';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    flex: 1,
  },
  image: {
    width: appInfo.sizes.WIDTH * 0.7,
    resizeMode: 'contain',
  },
});
