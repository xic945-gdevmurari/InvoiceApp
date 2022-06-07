import {Platform} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';

import {getStatusBarHeight} from 'react-native-status-bar-height';

export const wp = (val: number) => widthPercentageToDP(val);

export const hp = (val: number) => heightPercentageToDP(val);

export const statusBarHeight = getStatusBarHeight();

export const isIos = Platform.OS === 'ios';

export const errorMessage = (text1: string, text2: string) => {
  Toast.show({
    type: 'error',
    text1: text1,
    text2: text2,
  });
};
