import React, {useEffect, useState} from 'react';
import {View, Text, Keyboard, StyleSheet, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LANGUAGE, USER_DATA} from '../../../actions/types';
import {useTheme} from '@react-navigation/native';
import I18n from 'react-native-i18n';

import {Button} from '../../../components';
import CustomSwitch from '../../../components/Common/CustomSwitch';
import InputText from '../../../components/Common/TextInput';
import {errorMessage, hp, wp} from '../../../helpers/constants';
import {icons} from '../../../helpers/iconConstant';
import {screenString} from '../../../helpers/strings';
import {fontFamily} from '../../../helpers/utils';
import {getText} from '../../../helpers/globalFunction';

const RegisterScreen: React.FC = ({navigation}: any) => {
  const {allUserData, language, isLanguage} = useSelector(
    (state: object) => state?.auth,
  );
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [text, setText] = useState<boolean>(true);
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<boolean>(
    I18n.locale !== 'en',
  );
  const [isChange, setIsChange] = useState<boolean>(false);

  useEffect(() => {
    if (isChange === false) {
      setIsChange(true);
      setSelectedLanguage(!selectedLanguage);
      dispatch({
        type: LANGUAGE,
        payload: !isLanguage ? 'en' : 'fr',
      });
      I18n.locale = language;
    }
  }, [selectedLanguage]);

  const {colors} = useTheme();

  const dispatch = useDispatch();

  const style = getGlobalStyles();

  const onToggleSwitch = () => {
    dispatch({
      type: USER_DATA,
      payload: {...allUserData, isDarkTheme: isSwitchOn},
    });
    setIsSwitchOn(!isSwitchOn);
  };

  const onlaguageSwitch = () => {
    setSelectedLanguage(!selectedLanguage);
    dispatch({
      type: LANGUAGE,
      payload: {
        isLanguage: selectedLanguage,
        language: !isLanguage ? 'en' : 'fr',
      },
    });
    I18n.locale = language;
  };

  const onLoginPress = async () => {
    if (userName.trim().length === 0) {
      errorMessage(getText('userName'), getText('UsernameRequired'));
    } else if (password.trim().length === 0) {
      errorMessage(getText('password'), getText('PasswordRequired'));
    } else if (password.trim().length < 4) {
      errorMessage(getText('password'), getText('PasswordMust4Digit'));
    } else {
      dispatch({
        type: USER_DATA,
        payload: {...allUserData, userName, password},
      });
      navigation.navigate(screenString.setMPINScreen);
    }
  };

  return (
    <View
      onTouchStart={() => Keyboard.dismiss()}
      style={{
        ...style.containerStyle,
        backgroundColor: allUserData?.isDarkTheme
          ? colors.primaryBlack
          : colors.primaryWhite,
      }}>
      <SafeAreaView
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <CustomSwitch
          language
          value={selectedLanguage}
          onTogglePress={onlaguageSwitch}
        />
        <CustomSwitch
          value={allUserData?.isDarkTheme}
          onTogglePress={onToggleSwitch}
        />
      </SafeAreaView>
      <View style={style.subContainerStyle}>
        <Text
          style={{
            ...style.titleTextStyle,
            color: !allUserData?.isDarkTheme
              ? colors.commonColor
              : colors.primaryWhite,
          }}>
          {getText('helloAgain')}
        </Text>
        <Text
          style={{
            ...style.subTitleTextStyle,
            color: !allUserData?.isDarkTheme
              ? colors.commonColor
              : colors.primaryWhite,
          }}>
          {getText('welcomeBack')}
        </Text>
        <InputText
          containerStyle={{
            borderWidth: userName ? 1 : 0,
            borderColor: userName ? colors.commonColor : colors.shadowColor_5,
          }}
          textInputStyle={{fontFamily: fontFamily.regular}}
          value={userName}
          placeholder={getText('userName')}
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
          placeholder={getText('password')}
          placeholderTextColor={colors.shadowColor_6}
          onChangeText={setPassword}
          secureTextEntry={text}
          icon={text ? icons.close_eye : icons.show_eye}
          onButtonPress={() => setText(!text)}
        />
        <Button
          title={getText('submit')}
          buttonStyle={style.submitButtonStyle}
          buttonTextStyle={style.submitButtonTextStyle}
          onPress={onLoginPress}
        />
      </View>
    </View>
  );
};

const getGlobalStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    containerStyle: {
      flex: 1,
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
};

export default RegisterScreen;
