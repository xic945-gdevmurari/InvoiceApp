import React, {useState} from 'react';
import {View, Text, Image, Keyboard, StyleSheet} from 'react-native';

import {Button} from '../../../components';
import InputText from '../../../components/Common/TextInput';
import {errorMessage, hp, wp} from '../../../helpers/constants';
import {icons} from '../../../helpers/iconConstant';
import {screenString} from '../../../helpers/strings';
import {colors, fontFamily} from '../../../helpers/utils';

const RegisterScreen = ({navigation}: any) => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userNameError, setuserNameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [text, setText] = useState<boolean>(true);

  const onLoginPress = async () => {
    if (userName.trim().length === 0) {
      errorMessage('UserName', 'Username is required!');
    } else if (password.trim().length === 0) {
      errorMessage('Password', 'Password is required!');
    } else if (password.trim().length < 4) {
      errorMessage('Password', 'Password must required 4 digit!');
    } else {
      navigation.navigate(screenString.setMPINScreen, {userName, password});
    }
  };

  return (
    <View onTouchStart={() => Keyboard.dismiss()} style={style.containerStyle}>
      <View style={style.subContainerStyle}>
        <Text style={style.titleTextStyle}>{'Hello Again!'}</Text>
        <Text style={style.subTitleTextStyle}>{'Welcome back'}</Text>
        <InputText
          containerStyle={{
            borderWidth: userName ? 1 : 0,
            borderColor: userName ? colors.commonColor : colors.shadowColor_5,
          }}
          textInputStyle={{fontFamily: fontFamily.regular}}
          value={userName}
          placeholder={'Username'}
          placeholderTextColor={colors.shadowColor_6}
          onChangeText={setUserName}
        />
        <InputText
          containerStyle={[
            style.textInputContainerStyle,
            {
              borderWidth: password ? 1 : 0,
              borderColor: password ? colors.commonColor : colors.shadowColor_5,
            },
          ]}
          value={password}
          placeholder={'Password'}
          placeholderTextColor={colors.shadowColor_6}
          onChangeText={setPassword}
          secureTextEntry={text}
          icon={text ? icons.close_eye : icons.show_eye}
          onButtonPress={() => setText(!text)}
        />
        <Button
          title={'Submit'}
          buttonStyle={style.submitButtonStyle}
          buttonTextStyle={style.submitButtonTextStyle}
          onPress={onLoginPress}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
  },
  imageStyle: {
    height: hp(24.54),
    width: wp(45.33),
    alignSelf: 'flex-end',
    marginTop: hp(5.66),
  },
  errorTextStyle: {
    marginLeft: wp(1),
    marginTop: hp(0.5),
    color: 'red',
    fontSize: wp(3.73),
    fontFamily: fontFamily.regular,
    fontWeight: '400',
  },
  subContainerStyle: {
    position: 'absolute',
    marginTop: hp(28.57),
    marginHorizontal: wp(5.33),
  },
  titleTextStyle: {
    color: colors.commonColor,
    fontSize: wp(5.33),
    fontFamily: fontFamily.regular,
    fontWeight: '700',
  },
  subTitleTextStyle: {
    marginTop: hp(0.49),
    marginBottom: hp(2.46),
    fontSize: wp(9.6),
    fontFamily: fontFamily.regular,
    fontWeight: '700',
    color: colors.commonColor,
  },
  textInputContainerStyle: {
    marginTop: hp(1.72),
  },
  forgotPasswordTextStyle: {
    alignSelf: 'flex-end',
    fontSize: wp(3.73),
    fontFamily: fontFamily.regular,
    fontWeight: 'normal',
    lineHeight: 20,
    color: colors.forgotPasswordColor,
  },
  submitButtonStyle: {
    height: hp(7.14),
    width: wp(89.33),
    marginVertical: hp(4.31),
    alignSelf: 'center',
    borderRadius: wp(2.66),
    backgroundColor: colors.commonColor,
  },
  submitButtonTextStyle: {
    color: colors.primaryWhite,
    fontSize: wp(4.8),
    fontFamily: fontFamily.regular,
    fontWeight: '400',
  },
});

export default RegisterScreen;
