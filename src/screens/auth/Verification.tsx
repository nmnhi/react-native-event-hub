import React, {useState} from 'react';
import {Sms, ArrowRight} from 'iconsax-react-native';
import {
  ContainerComponent,
  SectionComponent,
  SpaceComponents,
  InputComponent,
  ButtonComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';

const Verification = () => {
  const [otp, setOtp] = useState('');

  return (
    <ContainerComponent back isImageBackground>
      <SectionComponent>
        <TextComponent text="Verification" title styles={{marginBottom: 12}} />
        <TextComponent text="We’ve send you the verification code on +1 2620 0323 7631" />
        <SpaceComponents height={26} />
        <InputComponent
          value={otp}
          onChange={val => setOtp(val)}
          placeholder="abc@email.com"
          affix={<Sms size={22} color={appColors.gray} />}
          allowClear
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="CONTINUE"
          type="primary"
          icon={<ArrowRight size={20} color={appColors.white} />}
          iconFlex="right"
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default Verification;
