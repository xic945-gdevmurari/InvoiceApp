import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {USER_DATA} from '../../../actions/types';
import DeviceInfo from 'react-native-device-info';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {Button} from '../../../components';
import {errorMessage, hp, isIos, wp} from '../../../helpers/constants';
import {fontFamily} from '../../../helpers/utils';
import {CommonActions, useTheme} from '@react-navigation/native';
import {screenString} from '../../../helpers/strings';
import moment from 'moment';
import CustomSwitch from '../../../components/Common/CustomSwitch';
import {getText} from '../../../helpers/globalFunction';

interface props {
  navigation: any;
}

const SetMPINScreen: React.FC<props> = ({navigation}) => {
  const [mpin, setMPIN] = useState<string>('');
  const [confirmMPIN, setConfirmMPIN] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

  const {allUserData} = useSelector(state => state?.auth);

  const {colors} = useTheme();

  const style = getGlobalStyles();

  const onToggleSwitch = () => {
    dispatch({
      type: USER_DATA,
      payload: {...allUserData, isDarkTheme: isSwitchOn},
    });
    setIsSwitchOn(!isSwitchOn);
  };

  const dispatch = useDispatch();

  const onSetMPIN = () => {
    if (mpin?.trim()?.length === 0) {
      errorMessage('MPIN', 'MPIN is required!');
    } else if (confirmMPIN.trim()?.length === 0) {
      errorMessage('Confirm MPIN', 'Confirm MPIN is required!');
    } else if (mpin !== confirmMPIN) {
      errorMessage('MPIN', 'MPIN and confirm MPIN not matched!');
    } else {
      let deviceId = DeviceInfo.getDeviceId();
      let date = new Date().toLocaleString();
      dispatch({
        type: USER_DATA,
        payload: {
          ...allUserData,
          userName: allUserData?.userName,
          password: allUserData?.password,
          deviceId,
          mpin,
          date: moment(date).format('YYYY-MM-DD HH:mm:ss'),
        },
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: screenString.mPinScreen}],
        }),
      );
    }
  };
  return (
    <View
      style={{
        ...style.container,
        backgroundColor: allUserData?.isDarkTheme
          ? colors.primaryBlack
          : colors.primaryWhite,
      }}>
      <SafeAreaView style={{alignSelf: 'flex-end'}}>
        <CustomSwitch
          value={allUserData?.isDarkTheme}
          onTogglePress={onToggleSwitch}
        />
      </SafeAreaView>
      <View style={style.subContainerStyle}>
        <Text
          style={{
            ...style.titleTextStyle,
            color: allUserData?.isDarkTheme
              ? colors.primaryWhite
              : colors.commonColor,
          }}>
          {getText('setYourMPIN')}
        </Text>
        <Text
          style={{
            ...style.pinTextStyle,
            color: allUserData?.isDarkTheme
              ? colors.primaryWhite
              : colors.commonColor,
          }}>
          {getText('MPIN')}
        </Text>
        <OTPInputView
          pinCount={4}
          autoFocusOnLoad
          secureTextEntry={true}
          onCodeChanged={setMPIN}
          codeInputFieldStyle={{
            ...style.underlineStyleBase,
            color: allUserData?.isDarkTheme
              ? colors.primaryWhite
              : colors.primaryBlack,
          }}
          codeInputHighlightStyle={{
            ...style.underlineStyleHighLighted,
            borderColor: allUserData?.isDarkTheme
              ? colors.primaryWhite
              : colors.primaryBlack,
          }}
          style={style.otpInputContainer}
        />
        <Text
          style={{
            ...style.pinTextStyle,
            color: allUserData?.isDarkTheme
              ? colors.primaryWhite
              : colors.commonColor,
          }}>
          {getText('confirmMPIN')}
        </Text>
        <OTPInputView
          pinCount={4}
          autoFocusOnLoad
          secureTextEntry={true}
          onCodeChanged={setConfirmMPIN}
          codeInputFieldStyle={{
            ...style.underlineStyleBase,
            color: allUserData?.isDarkTheme
              ? colors.primaryWhite
              : colors.primaryBlack,
          }}
          codeInputHighlightStyle={{
            ...style.underlineStyleHighLighted,
            borderColor: allUserData?.isDarkTheme
              ? colors.primaryWhite
              : colors.primaryBlack,
          }}
          style={style.otpInputContainer}
        />
      </View>
      <Button
        title={getText('setMPIN')}
        buttonStyle={style.submitButtonStyle}
        buttonTextStyle={style.submitButtonTextStyle}
        onPress={onSetMPIN}
      />
    </View>
  );
};

const getGlobalStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    subContainerStyle: {
      marginTop: hp(12),
      marginHorizontal: wp(5.33),
    },
    titleTextStyle: {
      textAlign: 'center',
      color: colors.commonColor,
      fontSize: wp(6.66),
      fontFamily: fontFamily.regular,
      fontWeight: '700',
    },
    underlineStyleBase: {
      width: wp(14),
      height: hp(isIos ? 7 : 8),
      borderWidth: 1,
      borderRadius: wp(2),
      color: colors.primaryBlack,
      fontSize: wp(6.68),
      fontWeight: '400',
    },
    pinTextStyle: {
      marginTop: hp(5),
      marginBottom: hp(2),
      marginHorizontal: wp(2),
      fontFamily: fontFamily.regular,
      fontSize: wp(3.73),
      color: colors.commonColor,
      fontWeight: '700',
    },
    underlineStyleHighLighted: {
      borderColor: colors.primaryBlack,
    },
    otpInputContainer: {
      width: '100%',
      height: hp(8),
      paddingHorizontal: hp(1),
      shadowColor: colors.commonColor,
      shadowOffset: {width: wp(10), height: hp(10)},
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 1,
      alignSelf: 'center',
    },
    submitButtonStyle: {
      marginTop: hp(15),
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

export default SetMPINScreen;
