import {ArrowRight2} from 'iconsax-react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {RowComponent, SpaceComponents, TextComponent} from '.';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  title: string;
  onPress: () => void;
}

const TabBarComponent = (props: Props) => {
  const {title, onPress} = props;

  return (
    <RowComponent styles={{marginBottom: 20, paddingHorizontal: 16}}>
      <TextComponent
        text={title}
        flex={1}
        size={18}
        font={fontFamilies.medium}
      />
      <TouchableOpacity onPress={onPress}>
        <RowComponent>
          <TextComponent
            text="See all"
            size={14}
            color={appColors.borderInput}
          />
          <SpaceComponents width={2} />
          <ArrowRight2 size={14} color={appColors.borderInput} variant="Bold" />
        </RowComponent>
      </TouchableOpacity>
    </RowComponent>
  );
};

export default TabBarComponent;
