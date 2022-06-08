import React, {FC} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {hp, wp} from '../../../helpers/constants';
import {icons} from '../../../helpers/iconConstant';
import {colors, fontFamily} from '../../../helpers/utils';
interface props {
  headerName: string;
  onClosePress: () => void;
  btnTitle: string;
  button: any;
  onPress: () => void;
  onCancel: () => void;
  btnTitle2: string;
  mainContainerStyle: object;
  buttonViewStyle: object;
}

const PopupModal: FC<props> = ({
  headerName,
  onClosePress,
  children,
  btnTitle,
  button,
  onPress,
  onCancel,
  btnTitle2,
  mainContainerStyle,
  buttonViewStyle,
}) => {
  return (
    <View style={[style.mainContainer, mainContainerStyle]}>
      <View style={style.headerContainer}>
        <Text style={style.titleText}>{headerName}</Text>
        <TouchableOpacity onPress={onClosePress}>
          <Image
            source={icons.close}
            resizeMode={'contain'}
            style={style.icon}
          />
        </TouchableOpacity>
      </View>
      {children}
      <View style={[style.allBtnView, buttonViewStyle]}>
        {btnTitle && (
          <TouchableOpacity onPress={onPress} style={style.btnView}>
            <Text style={style.btnText}>{btnTitle}</Text>
          </TouchableOpacity>
        )}
        {btnTitle2 && (
          <TouchableOpacity onPress={onCancel} style={style.btnView2}>
            <Text style={style.btnText2}>{btnTitle2}</Text>
          </TouchableOpacity>
        )}
        {button}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  mainContainer: {
    backgroundColor: colors.backgroundColor,
    margin: wp(5),
    borderRadius: wp(2),
  },
  headerContainer: {
    backgroundColor: colors.orange,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1.75),
    borderTopStartRadius: wp(2),
    borderTopEndRadius: wp(2),
    paddingHorizontal: wp(2),
  },
  icon: {
    width: wp(6.5),
    height: wp(6.5),
    tintColor: colors.backgroundColor,
  },
  titleText: {
    fontSize: wp(4),
    fontFamily: fontFamily.regular,
    color: colors.backgroundColor,
  },
  btnView: {
    alignSelf: 'center',
    padding: hp(1.3),
    borderRadius: wp(1.5),
    backgroundColor: colors.orange,
    marginBottom: wp(2),
    marginHorizontal: wp(1),
  },
  btnText: {
    color: colors.backgroundColor,
    marginHorizontal: wp(2),
    fontSize: wp(3.73),
    fontFamily: fontFamily.regular,
  },
  btnView2: {
    alignSelf: 'center',
    padding: hp(1.1),
    borderRadius: wp(1.5),
    backgroundColor: colors.backgroundColor,
    marginBottom: wp(2),
    marginHorizontal: wp(0.5),
    borderColor: colors.orange,
    borderWidth: wp(0.2),
  },
  btnText2: {
    color: colors.orange,
    marginHorizontal: wp(2),
    fontSize: wp(4),
    fontFamily: fontFamily.regular,
  },
  allBtnView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(1.5)``,
  },
});

export default PopupModal;
