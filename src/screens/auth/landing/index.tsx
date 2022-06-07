import React, {useEffect} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

import {asyncStorageKey, screenString} from '../../../helpers/strings';

interface props{
  navigation:any
}

const LandingScreen:React.FC<props> = ({navigation}) => {
  const getLoginData = async () => {
    await AsyncStorage.getItem(asyncStorageKey.isLogin).then(value => {
      if (value !== null) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: screenString.listingScreen}],
          }),
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: screenString.loginScreen}],
          }),
        );
      }
    });
  };

  useEffect(() => {
    getLoginData();
  }, []);

  return <View />;
};

export default LandingScreen;
