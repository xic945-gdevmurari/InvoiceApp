import React from 'react';
import {Platform} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import {colors} from './utils';

export const wp = (val:number) => widthPercentageToDP(val);

export const hp = (val:number) => heightPercentageToDP(val);

export const statusBarHeight = getStatusBarHeight();

export const isIos = Platform.OS === 'ios';

export const validateEmail = (email:string) => {
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email);
};

export const validPassword = (password:string) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return re.test(password);
};

export const uiTheme = {
  palette: {
    primaryColor: colors.primaryWhite,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

export const errorMessage = (text1:string, text2:string) => {
  Toast.show({
    type: 'error',
    text1: text1,
    text2: text2,
  });
};
