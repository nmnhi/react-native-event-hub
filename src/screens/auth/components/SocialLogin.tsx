import React from 'react';
import {Facebook, Google} from '../../../assets/svgs';
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';

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
      <SpaceComponents height={16} />
      <ButtonComponent
        type="primary"
        color={appColors.white}
        text="Login with Google"
        icon={<Google width={26} height={26} />}
        iconFlex="left"
        textColor={appColors.text}
        textFont={fontFamilies.regular}
      />
      <ButtonComponent
        type="primary"
        color={appColors.white}
        text="Login with Facebook"
        icon={<Facebook width={26} height={26} />}
        iconFlex="left"
        textColor={appColors.text}
        textFont={fontFamilies.regular}
      />
    </SectionComponent>
  );
};

export default SocialLogin;
