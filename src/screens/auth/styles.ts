import {StyleSheet} from 'react-native';
import {appInfo} from '../../constants/appInfos';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'coral',
  },
  swiperImage: {
    flex: 1,
    width: appInfo.sizes.WIDTH,
    height: appInfo.sizes.HEIGHT,
    resizeMode: 'cover',
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
    fontFamily: fontFamilies.medium,
  },
  textControlSkip: {
    color: appColors.gray2,
    fontFamily: fontFamilies.medium,
  },
});
