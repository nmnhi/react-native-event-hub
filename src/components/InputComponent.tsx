import React, {ReactNode, useState} from 'react';
import {
  KeyboardType,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {appColors} from '../constants/appColors';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  value: string;
  onChange: (value: string) => void;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
}

const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    affix,
    suffix,
    placeholder,
    isPassword,
    allowClear,
    type
  } = props;

  const [isShowPassword, setIsShowPassword] = useState(isPassword ?? false);

  return (
    <View style={[styles.inputContainer]}>
      {affix ?? affix}

      <TextInput
        style={[styles.input, globalStyles.text]}
        value={value}
        placeholder={placeholder ?? ''}
        onChangeText={val => onChange(val)}
        secureTextEntry={isShowPassword}
        placeholderTextColor={appColors.borderInput}
        keyboardType={type ?? 'default'}
        autoCapitalize="none"
      />

      {suffix ?? suffix}

      <TouchableOpacity
        onPress={
          isPassword
            ? () => setIsShowPassword(!isShowPassword)
            : () => onChange('')
        }>
        {isPassword ? (
          <FontAwesome
            name={isShowPassword ? 'eye-slash' : 'eye'}
            size={22}
            color={appColors.gray}
          />
        ) : (
          value.length > 0 &&
          allowClear && (
            <AntDesign name="close" size={22} color={appColors.gray} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray3,
    width: '100%',
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: appColors.white,
    marginBottom: 19
  },
  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    paddingHorizontal: 14
  }
});
