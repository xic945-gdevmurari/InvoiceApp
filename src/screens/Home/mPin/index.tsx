import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {errorMessage, hp, isIos, wp} from '../../../helpers/constants';
import {fontFamily} from '../../../helpers/utils';
import {CommonActions, useTheme} from '@react-navigation/native';
import {screenString} from '../../../helpers/strings';
import {Button} from '../../../components';
import {USER_DATA} from '../../../actions/types';
import moment from 'moment';
import CustomSwitch from '../../../components/Common/CustomSwitch';

interface props {
  navigation: any;
}

const MPINScreen: React.FC<props> = ({navigation}) => {
  const {allUserData} = useSelector((state: any) => state.auth);
  const [mpin, setMPIN] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

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

  const onLoginPress = () => {
    const isDataFound = allUserData?.mpin == mpin;

    if (mpin?.length === 0) {
      errorMessage('MPIN is empty', 'Please enter MPIN!');
    } else if (isDataFound) {
      let date = new Date().toLocaleString();
      dispatch({
        type: USER_DATA,
        payload: {
          ...allUserData,
          date: moment(date).format('YYYY-MM-DD HH:mm:ss'),
        },
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: screenString.dashboardScreen}],
        }),
      );
    } else {
      errorMessage('Entered MPIN is incorrect', 'Please enter valid MPIN.');
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
          {'MPIN Login'}
        </Text>
        <Text
          style={{
            ...style.pinTextStyle,
            color: allUserData?.isDarkTheme
              ? colors.primaryWhite
              : colors.commonColor,
          }}>
          {'Enter your MPIN'}
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
      </View>
      <Button
        title={'Login'}
        buttonStyle={style.submitButtonStyle}
        buttonTextStyle={style.submitButtonTextStyle}
        onPress={onLoginPress}
      />
    </View>
  );
};

const getGlobalStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    subContainerStyle: {
      marginTop: hp(12),
      marginHorizontal: wp(5.33),
    },
    titleTextStyle: {
      textAlign: 'center',
      color: colors.commonColor,
      fontSize: wp(8.5),
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

export default MPINScreen;
