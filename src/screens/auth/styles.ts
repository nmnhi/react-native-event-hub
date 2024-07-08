import {StyleSheet} from 'react-native';
import {appInfo} from '../../constants/appInfos';
import {appColors} from '../../constants/appColors';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperImage: {
    flex: 1,
    width: appInfo.sizes.WIDTH,
    height: appInfo.sizes.HEIGHT,
    resizeMode: 'contain',
  },
  swiperControl: {
    paddingHorizontal: 40,
    paddingVertical: 24,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textControlNext: {
    color: appColors.white,
    fontSize: 18,
    fontWeight: 600,
  },
  textControlSkip: {
    color: appColors.gray2,
    fontSize: 18,
    fontWeight: 600,
  },
});