import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  Bookmark2,
  Calendar,
  Logout,
  Message2,
  MessageQuestion,
  Setting2,
  Sms,
  User
} from 'iconsax-react-native';
import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {LoginManager} from 'react-native-fbsdk-next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {appColors} from '../constants/appColors';
import {authSelector, removeAuth} from '../store/reducers/authReducer';
import {globalStyles} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import SpaceComponents from './SpaceComponents';
import TextComponent from './TextComponent';

const DrawerCustom = ({navigation}: any) => {
  const dispatch = useDispatch();
  const user = useSelector(authSelector);

  const color = appColors.gray;
  const size = 20;

  const profileMenu = [
    {
      key: 'MyProfile',
      title: 'My Profile',
      icon: <User size={size} color={color} />
    },
    {
      key: 'Message',
      title: 'Message',
      icon: <Message2 size={size} color={color} />
    },
    {
      key: 'Calendar',
      title: 'Calendar',
      icon: <Calendar size={size} color={color} />
    },
    {
      key: 'Bookmark',
      title: 'Bookmark',
      icon: <Bookmark2 size={size} color={color} />
    },
    {
      key: 'ContactUus',
      title: 'Contact Us',
      icon: <Sms size={size} color={color} />
    },
    {
      key: 'Settings',
      title: 'Settings',
      icon: <Setting2 size={size} color={color} />
    },
    {
      key: 'HelpAndFAQs',
      title: 'Help & FAQs',
      icon: <MessageQuestion size={size} color={color} />
    },
    {
      key: 'SignOut',
      title: 'Sign Out',
      icon: <Logout size={size} color={color} />
    }
  ];

  const handleSignOut = async () => {
    await GoogleSignin.signOut();
    await LoginManager.logOut();
    dispatch(removeAuth({}));
  };

  return (
    <View style={[localStyles.container]}>
      <View>
        {user.photoUrl ? (
          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('Profile', {
                screen: 'ProfileScreen',
                params: {}
              });
            }}>
            <Image
              source={{uri: user.photoUrl}}
              style={[localStyles.avatar]}
              width={60}
              height={60}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={[
              localStyles.avatar,
              {
                backgroundColor: appColors.gray2
              }
            ]}>
            <TextComponent
              title
              text={
                user.name
                  ? user.name
                      .split(' ')
                      [user.name.split(' ').length - 1].substring(0, 1)
                  : ''
              }
            />
          </View>
        )}

        <TextComponent text={user.name} size={19} title />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={{flex: 1, marginVertical: 20}}
        renderItem={({item, index}) => (
          <RowComponent
            styles={[localStyles.listItems]}
            onPress={
              item.key === 'SignOut'
                ? () => handleSignOut()
                : () => {
                    console.log(item.key);
                    navigation.closeDrawer();
                  }
            }>
            {item.icon}
            <SpaceComponents width={8} />
            <TextComponent text={item.title} />
          </RowComponent>
        )}
      />

      <RowComponent justify="flex-start" styles={{paddingVertical: 24}}>
        <TouchableOpacity
          style={[
            globalStyles.button,
            {backgroundColor: '#00F8FF33', minHeight: 30, height: 'auto'}
          ]}>
          <MaterialCommunityIcons name="crown" size={20} color="#00F8FF" />
          <SpaceComponents width={8} />
          <TextComponent
            text="Upgrade Pro"
            color="#00F8FF"
            size={14}
            styles={{fontWeight: 600}}
          />
        </TouchableOpacity>
      </RowComponent>
    </View>
  );
};

export default DrawerCustom;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 55
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 100,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItems: {
    paddingVertical: 12
  }
});
