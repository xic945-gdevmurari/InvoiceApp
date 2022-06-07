import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import {useDispatch} from 'react-redux';
import {USER_DATA} from '../../../actions/types';
import DeviceInfo from 'react-native-device-info';

import {Button} from '../../../components';
import {errorMessage, hp, isIos, wp} from '../../../helpers/constants';
import {colors, fontFamily} from '../../../helpers/utils';
import {CommonActions} from '@react-navigation/native';
import {screenString} from '../../../helpers/strings';

interface props {
  route: object;
  navigation: any;
}

const SetMPINScreen: React.FC<props> = ({navigation, route}) => {
  const [mpin, setMPIN] = useState<string>('');
  const [confirmMPIN, setConfirmMPIN] = useState<string>('');

  const {password, userName} = route?.params;

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

      const obj = {
        userName,
        password,
        deviceId,
        mpin,
      };
      dispatch({type: USER_DATA, payload: [obj]});
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: screenString.mPinScreen}],
        }),
      );
    }
  };
  return (
    <View style={style.container}>
      <View style={style.subContainerStyle}>
        <Text style={style.titleTextStyle}>{'Set Your MPIN'}</Text>
        <Text style={style.pinTextStyle}>{'MPIN'}</Text>
        <OTPInputView
          pinCount={4}
          autoFocusOnLoad
          onCodeChanged={setMPIN}
          codeInputFieldStyle={style.underlineStyleBase}
          codeInputHighlightStyle={style.underlineStyleHighLighted}
          style={style.otpInputContainer}
        />
        <Text style={style.pinTextStyle}>{'Confirm MPIN'}</Text>
        <OTPInputView
          pinCount={4}
          autoFocusOnLoad
          onCodeChanged={setConfirmMPIN}
          codeInputFieldStyle={style.underlineStyleBase}
          codeInputHighlightStyle={style.underlineStyleHighLighted}
          style={style.otpInputContainer}
        />
      </View>
      <Button
        title={'Set MPIN'}
        buttonStyle={style.submitButtonStyle}
        buttonTextStyle={style.submitButtonTextStyle}
        onPress={onSetMPIN}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageStyle: {
    height: hp(24.54),
    width: wp(45.33),
    alignSelf: 'flex-end',
    marginTop: hp(5.66),
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

export default SetMPINScreen;
