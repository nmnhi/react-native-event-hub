import {
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort
} from 'iconsax-react-native';
import React from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  CategoriesList,
  CircleComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponents,
  TabBarComponent,
  TagComponent,
  TextComponent
} from '../../components';
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
          height: 182,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52
        }}>
        <View style={{paddingHorizontal: 16}}>
          {/* Location Section */}
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

          <SpaceComponents height={20} />

          {/* Search Bar Section */}
          <RowComponent>
            <RowComponent
              styles={{flex: 1}}
              onPress={() =>
                navigation.navigate('SearchEvents', {isFilter: false})
              }>
              <SearchNormal1
                variant="TwoTone"
                color={appColors.white}
                size={18}
              />
              <View
                style={{
                  width: 1,
                  backgroundColor: appColors.gray3,
                  marginHorizontal: 10,
                  height: 20
                }}
              />
              <TextComponent
                text="Search..."
                color={appColors.gray3}
                size={16}
              />
            </RowComponent>
            <TagComponent
              label="Filters"
              onPress={() =>
                navigation.navigate('SearchEvents', {isFilter: true})
              }
              icon={
                <CircleComponent size={20} color="#B1AFEA">
                  <Sort size={16} color={appColors.primary3} />
                </CircleComponent>
              }
              bgColor={appColors.primary3}
            />
          </RowComponent>

          <SpaceComponents height={20} />
        </View>
        <View style={{marginBottom: -18}}>
          {/* Categories List*/}
          <CategoriesList isFill />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[{flex: 1, marginTop: 16}]}>
        <SectionComponent styles={{paddingHorizontal: 0, paddingTop: 20}}>
          <TabBarComponent title="Upcoming Events" onPress={() => {}} />
          <FlatList
            horizontal
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem item={item} key={`event${index}`} type="card" />
            )}
          />
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
