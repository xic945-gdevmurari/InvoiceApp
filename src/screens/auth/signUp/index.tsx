import React, {useEffect, useState} from 'react';
import {View, Text, Image, Keyboard, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useIsFocused, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {isEmpty} from 'lodash';

import {Button} from '../../../components';
import InputText from '../../../components/Common/TextInput';
import {errorMessage, hp, statusBarHeight, validateEmail, wp} from '../../../helpers/constants';
import {icons} from '../../../helpers/iconConstant';
import {asyncStorageKey, screenString} from '../../../helpers/strings';
import {colors, fontFamily} from '../../../helpers/utils';
import {USER_DATA} from '../../../actions/types';

const signUpScreen = ({navigation}:any) => {
  const {allUserData} = useSelector((state:Array<[]>) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState(true);


  const selectedItem = allUserData?.filter(item => item?.email === email);

  const route = useRoute();
  const isFocued = useIsFocused();

  useEffect(() => {
    if (!isEmpty(route?.params)) {
      setEmail(route?.params?.data?.email);
      setPassword(route?.params?.data?.password);
    } else {
      setEmail('');
      setPassword('');
    }
  }, [isFocued]);

  const dispatch = useDispatch();

  const onSignUpPress = async () => {
   if (email.trim().length === 0) {
      errorMessage('Email', 'email address is required!');
    } else if (!validateEmail(email)) {
      errorMessage('Email', 'valid email is required!');
    } else if (!isEmpty(selectedItem) && isEmpty(route.params)) {
      errorMessage('Email', 'This email already exist!');
    } else if (password.trim().length === 0) {
      errorMessage('Password', 'password is required!');
    }  else {
      let data = {
        email: email,
        password: password,
      };
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: screenString.listingScreen}],
        }),
      );
      AsyncStorage.setItem(asyncStorageKey.isLogin, JSON.stringify(true));
      AsyncStorage.setItem(asyncStorageKey.userDetails, JSON.stringify(data));

      if (isEmpty(route?.params)) {
        let oldData = [];
        oldData = allUserData;
        oldData?.push(data);

        dispatch({type: USER_DATA, payload: oldData});
      } else {
        const finalUpdatedUserData = allUserData?.map((item:object) => {
          if (item?.email === email) {
            return {
              email: email,
              password: password,
            };
          } else {
            return item;
          }
        });

        dispatch({type: USER_DATA, payload: finalUpdatedUserData});
      }
    }
  };

  return (
    <View onTouchStart={() => Keyboard.dismiss()} style={style.containerStyle}>
      <View style={style.subContainerStyle}>
        <Text style={style.subTitleTextStyle}>
          {route?.params ? 'Update User Info' : 'Create new account'}
        </Text>
        <InputText
          containerStyle={{
            marginTop: hp(1.72),
            borderWidth: email ? 1 : 0,
            borderColor: email ? colors.commonColor : colors.shadowColor_5,
          }}
          textInputStyle={{fontFamily: fontFamily.regular}}
          value={email}
          placeholder={'Email ID'}
          placeholderTextColor={colors.shadowColor_6}
          onChangeText={setEmail}
          keyboardType={'email-address'}
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
          title={route?.params ? 'Update' : 'Sign Up'}
          buttonStyle={style.loginButtonStyle}
          buttonTextStyle={style.loginButtonTextStyle}
          onPress={onSignUpPress}
        />
        {!isEmpty(route?.params) && (
          <Button
            title={'Log-Out'}
            buttonStyle={{...style.loginButtonStyle, backgroundColor: 'orange'}}
            buttonTextStyle={{
              ...style.loginButtonTextStyle,
              color: colors.commonColor,
            }}
            onPress={() => {
              navigation.navigate(screenString.loginScreen);
              AsyncStorage.clear();
            }}
          />
        )}
      </View>
      {isEmpty(route?.params) && (
        <TouchableOpacity
          style={style.bottomTextViewStyle}
          activeOpacity={0.5}
          onPress={() => navigation.navigate(screenString.loginScreen)}>
          <Text
            style={[
              style.donotHaveAccountTextStyle,
              {color: colors.commonTextColor},
            ]}>
            {'Already have an account?'}
          </Text>
          <Text
            style={[
              style.donotHaveAccountTextStyle,
              {color: colors.forgotPasswordColor},
            ]}>
            {'SIGN IN'}
          </Text>
        </TouchableOpacity>
      )}
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
  subContainerStyle: {
    flex: 1,
    marginTop: statusBarHeight + hp(5),
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
    fontSize: wp(7),
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
  loginButtonStyle: {
    height: hp(7.14),
    width: wp(89.33),
    marginVertical: hp(4.31),
    alignSelf: 'center',
    borderRadius: wp(2.66),
    backgroundColor: colors.commonColor,
  },
  loginButtonTextStyle: {
    color: colors.primaryWhite,
    fontSize: wp(4.8),
    fontFamily: fontFamily.regular,
    fontWeight: '400',
  },
  bottomTextViewStyle: {
    flexDirection: 'row',
    marginBottom: hp(5),
    alignSelf: 'center',
  },
  donotHaveAccountTextStyle: {
    fontSize: wp(3.73),
    fontFamily: fontFamily.semiBold,
    color: colors.commonTextColor,
  },
  downArrowStyle: {
    height: hp(1.29),
    width: hp(1.29),
    alignSelf: 'center',
    tintColor: colors.commonColor,
    transform: [{rotate: '90deg'}],
  },
  datePickerViewStyle: {
    borderRadius: wp(2.66),
    marginTop: hp(1.72),
    paddingVertical: hp(2.66),
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(6.33),
  },
});

export default signUpScreen;
