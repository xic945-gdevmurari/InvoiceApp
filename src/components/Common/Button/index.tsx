import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {hp, wp} from '../../../helpers/constants';
import {colors, fontFamily} from '../../../helpers/utils';

interface props{
  title:string,
  loading:boolean,
  buttonStyle:object,
  buttonTextStyle:object,
  onPress:()=>void,
  icon:any,
  iconStyle:object,
  disabled:boolean,
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(89.33),
    height: hp(7.14),
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontSize: wp(4.8),
    fontFamily: fontFamily.regular,
    color: colors.primaryWhite,
  },
  iconStyle: {
    height: wp(6),
    width: wp(6),
  },
  buttonViewStyle: {
    flexDirection: 'row',
  },
});

const Button:React.FC<props> = ({
  title,
  loading,
  buttonStyle,
  buttonTextStyle,
  onPress,
  icon,
  iconStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.buttonStyle, buttonStyle]}>
      {loading ? (
        <ActivityIndicator size={hp(2)} color={colors.backgroundColor} />
      ) : (
        <View style={styles.buttonViewStyle}>
          {icon && (
            <Image
              style={[styles.iconStyle, iconStyle]}
              source={icon}
              resizeMode={'contain'}
            />
          )}
          <Text style={[styles.buttonTextStyle, buttonTextStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
