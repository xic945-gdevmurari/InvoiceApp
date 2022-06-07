import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { wp } from '../../../helpers/constants';
import { colors, fontFamily } from '../../../helpers/utils';

const style = StyleSheet.create({
  headerButtomMainStyle: {
    backgroundColor: colors.primaryWhite,
    height: wp(9),
    width: wp(9),
    borderRadius: wp(9) / 2,
    shadowColor: colors.primaryBlack,
    shadowOffset: {
      height: wp(9) / 4,
      width: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 10,
  },
  hitSlopStyle: {
    right: 10,
    top: 10,
    left: 10,
    bottom: 10,
  },
  containerStyle: {
    height: wp(9),
    width: wp(9),
    borderRadius: wp(9) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundColor1,
  },
  imageStyle: {
    height: wp(3.8),
    width: wp(3.8),
  },
  textStyle: {
    fontSize: wp(3.2),
    fontFamily: fontFamily.medium,
    fontWeight: '400',
    color: '#404040',
    lineHeight: 17.46,
  },
});

interface props{
   onPress:()=>void,
  icon:any,
  text:string,
  imageStyle:object,
  containerStyle:object,
  headerButtomMainStyle:object,
  disabled:boolean,
  textStyle:object,
}

const HeaderButton:React.FC<props> = ({
  onPress,
  icon,
  text,
  imageStyle,
  containerStyle,
  headerButtomMainStyle,
  disabled,
  textStyle,
}) => (
  <View style={headerButtomMainStyle}>
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[style.containerStyle, containerStyle]}
      disabled={disabled}
      hitSlop={style.hitSlopStyle}>
      {icon ? (
        <Image
          source={icon}
          style={[style.imageStyle, imageStyle]}
          resizeMode={'contain'}
        />
      ) : (
        <Text style={[style.textStyle, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  </View>
);

export default HeaderButton;
