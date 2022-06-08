import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import {CommonActions, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {Header} from '../../../components';
import {hp, wp} from '../../../helpers/constants';
import {icons} from '../../../helpers/iconConstant';
import {screenString} from '../../../helpers/strings';
import {fontFamily} from '../../../helpers/utils';
import CustomSwitch from '../../../components/Common/CustomSwitch';
import {USER_DATA, USER_DUMMY_DATA} from '../../../actions/types';
import {getText} from '../../../helpers/globalFunction';

const DashBoardScreen: FC = ({navigation}: any) => {
  const {allUserData, data} = useSelector((state: any) => state.auth);

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const styles = getGlobalStyles();

  const {colors} = useTheme();

  const dispatch = useDispatch();

  const onToggleSwitch = () => {
    dispatch({
      type: USER_DATA,
      payload: {...allUserData, isDarkTheme: isSwitchOn},
    });
    setIsSwitchOn(!isSwitchOn);
  };

  const onLogOutPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: screenString.mPinScreen}],
      }),
    );
  };

  const renderItem = ({item}: any) => (
    <View style={styles.itemContainerStyle}>
      <Text style={styles.cardTitleTextStyle}>
        {item?.name.charAt(0).toUpperCase() + item?.name.slice(1)}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.cardsubitleTextStyle}>{item?.pantone_value}</Text>
        <Text style={styles.cardsubitleTextStyle}>{item?.year}</Text>
      </View>
    </View>
  );

  const getUserData = async () => {
    let response = await fetch('https://reqres.in/api/unknown?per_page=12');
    let json = await response.json();

    dispatch({type: USER_DUMMY_DATA, payload: json?.data});
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: allUserData?.isDarkTheme
          ? colors.primaryBlack
          : colors.primaryWhite,
      }}>
      <StatusBar barStyle={'light-content'} />
      <Header
        mainContainer={{...styles.headerContainerStyle}}
        isTitle={getText('invoice')}
        isRightView
        rightIcon={icons.switch}
        rightIconContainerStyle={{backgroundColor: 'white'}}
        rightIconStyle={styles.logOutStyle}
        onRightIconPress={onLogOutPress}>
        <View
          style={{
            position: 'absolute',
            alignSelf: 'flex-start',
            left: 10,
            bottom: 10,
          }}>
          <CustomSwitch
            value={allUserData?.isDarkTheme}
            onTogglePress={onToggleSwitch}
          />
        </View>
      </Header>
      <View style={styles.cardViewStyle}>
        <Text style={styles.cardTitleTextStyle}>{`${getText('Welcome_Back')} ${
          allUserData?.userName
        } 👋`}</Text>
        <Text style={styles.cardsubitleTextStyle}>{`${getText(
          'lastLogin',
        )} ${moment(allUserData?.date).format('YYYY-MM-DD HH:mm:ss')}`}</Text>
      </View>
      {data?.length > 0 ? (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{height: hp(1)}} />}
          ListFooterComponent={() => <View style={{height: hp(2)}} />}
        />
      ) : (
        <ActivityIndicator size={'large'} color={'grey'} />
      )}
    </View>
  );
};

const getGlobalStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
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
    itemContainerStyle: {
      marginHorizontal: wp(5.33),
      padding: wp(5.33),
      borderRadius: wp(1.5),
      backgroundColor: 'lightgrey',
    },
  });
};

export default DashBoardScreen;
