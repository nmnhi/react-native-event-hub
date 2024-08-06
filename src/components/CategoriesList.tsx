import React, {ReactNode} from 'react';
import {FlatList} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Art, KnifeFork} from '../assets/svgs';
import {appColors} from '../constants/appColors';
import TagComponent from './TagComponent';
interface Props {
  isFill?: boolean;
}

interface Category {
  icon: ReactNode;
  color: string;
  label: string;
  key: string;
}

const CategoriesList = (props: Props) => {
  const {isFill} = props;

  const categories: Category[] = [
    {
      key: 'sport',
      label: 'Sport',
      icon: (
        <FontAwesome5
          name="basketball-ball"
          color={isFill ? appColors.white : '#F0635A'}
          size={20}
        />
      ),
      color: '#F0635A'
    },
    {
      key: 'music',
      label: 'Music',
      icon: (
        <FontAwesome5
          name="music"
          color={isFill ? appColors.white : '#F59762'}
          size={20}
        />
      ),
      color: '#F59762'
    },
    {
      key: 'food',
      label: 'Food',
      icon: <KnifeFork color={isFill ? appColors.white : '#29D697'} />,
      color: '#29D697'
    },
    {
      key: 'art',
      label: 'Art',
      icon: <Art color={isFill ? appColors.white : '#39C3F2'} />,
      color: '#39C3F2'
    }
  ];

  return (
    <FlatList
      style={{paddingHorizontal: 16}}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      renderItem={({item, index}) => (
        <TagComponent
          styles={{
            marginRight: index === categories.length - 1 ? 28 : 12,
            minWidth: 90
          }}
          bgColor={isFill ? item.color : appColors.white}
          icon={item.icon}
          label={item.label}
          onPress={() => {}}
        />
      )}
    />
  );
};

export default CategoriesList;
