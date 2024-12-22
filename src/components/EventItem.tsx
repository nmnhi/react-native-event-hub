import React from 'react';
import {CardComponent, TextComponent} from '.';
import {appInfo} from '../constants/appInfos';

interface Props {
  item: any;
  type: 'card' | 'list';
}

const EventItem = (props: Props) => {
  const {item, type} = props;

  return (
    <CardComponent
      onPress={() => {}}
      styles={{width: appInfo.sizes.WIDTH * 0.6}}>
      <TextComponent
        text="International Band Music Concert"
        title
        size={18}
        numberOfLine={1}
      />
    </CardComponent>
  );
};

export default EventItem;
