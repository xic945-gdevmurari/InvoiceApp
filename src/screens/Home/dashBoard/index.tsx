import React, {FC} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import moment from 'moment';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {Header} from '../../../components';
import {hp, wp} from '../../../helpers/constants';
import {icons} from '../../../helpers/iconConstant';
import {screenString} from '../../../helpers/strings';
import {colors, fontFamily} from '../../../helpers/utils';
import {USER_DATA} from '../../../actions/types';

const DashBoardScreen: FC = () => {
  const {dispatch} = useNavigation();
  const {allUserData} = useSelector((state: any) => state.auth);

  const onLogOutPress = () => {
    dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: screenString.mPinScreen}],
      }),
    );
    let date = new Date().toLocaleString();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Header
        mainContainer={styles.headerContainerStyle}
        isTitle="Invoice"
        isRightView
        rightIcon={icons.switch}
        rightIconContainerStyle={{backgroundColor: colors.primaryWhite}}
        rightIconStyle={styles.logOutStyle}
        onRightIconPress={onLogOutPress}
      />
      <View style={styles.cardViewStyle}>
        <Text
          style={
            styles.cardTitleTextStyle
          }>{`Welcome Back ${allUserData?.[0]?.userName} 👋`}</Text>
        <Text style={styles.cardsubitleTextStyle}>{`Last Login Time ${moment(
          allUserData?.[0]?.date,
        ).format('YYYY-MM-DD HH:mm:ss')}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainerStyle: {
    backgroundColor: colors.commonColor,
    paddingBottom: hp(1),
  },
  logOutStyle: {
    tintColor: colors.primaryRed,
    height: wp(7.8),
    width: wp(7.8),
  },
  cardViewStyle: {
    margin: wp(5.33),
    padding: wp(5.33),
    borderRadius: wp(1.5),
    backgroundColor: colors.primaryWhite,
    shadowColor: colors.shadowColor_8,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitleTextStyle: {
    fontSize: wp(4.8),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    lineHeight: 29,
    color: colors.commonColor,
  },
  cardsubitleTextStyle: {
    fontSize: wp(3),
    fontFamily: fontFamily.medium,
    fontWeight: '400',
    lineHeight: 25,
    color: colors.shadowColor_5,
  },
});

export default DashBoardScreen;
