import {HambergerMenu, Notification} from 'iconsax-react-native';
import React from 'react';
import {Platform, StatusBar, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CircleComponent, RowComponent, TextComponent} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />

      <View
        style={{
          backgroundColor: appColors.primary,
          height: 179,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
          paddingHorizontal: 16
        }}>
        <RowComponent>
          <TouchableOpacity>
            <HambergerMenu
              size={24}
              color={appColors.white}
              onPress={() => navigation.openDrawer()}
            />
          </TouchableOpacity>

          <View style={[{flex: 1, alignItems: 'center'}]}>
            <RowComponent>
              <TextComponent
                text="Current location"
                color={appColors.white2}
                size={12}
              />
              <MaterialIcons
                name="arrow-drop-down"
                size={18}
                color={appColors.white}
              />
            </RowComponent>
            <TextComponent
              text="New York, USA"
              color={appColors.white}
              flex={0}
              font={fontFamilies.medium}
              size={13}
            />
          </View>
          <CircleComponent color="#524CE0" size={36}>
            <View>
              <Notification size={18} color={appColors.white} />
              <View
                style={{
                  backgroundColor: '#02E9FE',
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  position: 'absolute',
                  borderColor: '#524CE0',
                  borderWidth: 2,
                  top: -2,
                  right: 0,
                  transform: [{scale: 0.8}]
                }}
              />
            </View>
          </CircleComponent>
        </RowComponent>
      </View>
      <View
        style={{
          flex: 1
        }}></View>
    </View>
  );
};

export default HomeScreen;
