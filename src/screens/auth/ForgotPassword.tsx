import React, {useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent,
} from '../../components';
import {ArrowRight, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  return (
    <ContainerComponent back isImageBackground>
      <SectionComponent>
        <TextComponent
          text="Reset Password"
          title
          styles={{marginBottom: 12}}
        />
        <TextComponent text="Please enter your email address to request a password reset" />
        <SpaceComponents height={26} />
        <InputComponent
          value={email}
          onChange={val => setEmail(val)}
          placeholder="abc@email.com"
          affix={<Sms size={22} color={appColors.gray} />}
          allowClear
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="SEND"
          type="primary"
          icon={<ArrowRight size={20} color={appColors.white} />}
          iconFlex="right"
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ForgotPassword;
