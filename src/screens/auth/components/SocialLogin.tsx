import React from 'react';
import {
  ButtonComponent,
  SectionComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Google} from 'iconsax-react-native';

const SocialLogin = () => {
  return (
    <SectionComponent>
      <TextComponent
        text="OR"
        color={appColors.gray4}
        size={16}
        font={fontFamilies.medium}
        styles={{textAlign: 'center'}}
      />
      <ButtonComponent
        type="primary"
        color={appColors.white}
        text="Login with Google"
        icon={<Google size={24} color={appColors.primary} />}
        iconFlex="left"
        textColor={appColors.text}
      />
    </SectionComponent>
  );
};

export default SocialLogin;
