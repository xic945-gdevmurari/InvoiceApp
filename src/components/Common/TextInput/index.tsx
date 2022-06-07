import React from 'react';
import {Image, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

import { hp, wp } from '../../../helpers/constants';
import { colors, fontFamily } from '../../../helpers/utils';

const style = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(89.33),
    height: hp(7.14),
    borderRadius: wp(2.66),
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: wp(6.13),
  },
  textInputStyle: {
    flex: 1,
    alignSelf: 'center',
    paddingVertical: 0,
    fontSize: wp(3.73),
    fontFamily: fontFamily.regular,
    color: colors.commonTextColor,
  },
  imageStyle: {
    height: wp(6.4),
    width: wp(6.4),
    tintColor: colors.iconColor,
  },
  copyIconViewStyle: {
    position: 'absolute',
    alignSelf: 'center',
    right: 14,
  },
  copyIconStyle: {
    height: wp(4),
    width: wp(4),
    tintColor: colors.commonColor,
  },
});

interface props{
  containerStyle:object,
  textInputStyle:object,
  placeholder:string,
  placeholderTextColor:string,
  keyboardType:string,
  maxLength:number,
  value:string,
 onChangeText: (item: string) => void;
  icon:any,
  onButtonPress:()=>void,
  imageStyle:object,
  onFocus:any,
  onBlur:any,
  textContentType:string,
  secureTextEntry:boolean,
  editable:boolean,
  multiline:number,
  numberOfLines:number,
}

const InputText:React.FC<props> = ({
  containerStyle,
  textInputStyle,
  placeholder,
  placeholderTextColor,
  keyboardType,
  maxLength,
  value,
  onChangeText,
  icon,
  onButtonPress,
  imageStyle,
  onFocus,
  onBlur,
  textContentType,
  secureTextEntry,
  editable,
  multiline,
  numberOfLines,
}) => {
  return (
    <View style={[style.containerStyle, containerStyle]}>
      <TextInput
        style={[style.textInputStyle, textInputStyle]}
        placeholder={placeholder}
        editable={editable}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCorrect={false}
        autoCapitalize={'none'}
        onFocus={onFocus}
        onBlur={onBlur}
        textContentType={textContentType || 'password'}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {icon && (
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          activeOpacity={0.7}
          onPress={onButtonPress}>
          <Image
            source={icon}
            style={[style.imageStyle, imageStyle]}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputText;
