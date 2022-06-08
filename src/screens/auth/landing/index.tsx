import React, {useEffect} from 'react';
import {View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {isEmpty} from 'lodash';

import {screenString} from '../../../helpers/strings';
import {useSelector} from 'react-redux';

interface props {
  navigation: any;
}

const LandingScreen: React.FC<props> = ({navigation}) => {
  const {allUserData} = useSelector(state => state.auth);

  const getLoginData = async () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: isEmpty(allUserData?.userName)
              ? screenString.registerScreen
              : isEmpty(allUserData?.mpin)
              ? screenString.setMPINScreen
              : screenString.mPinScreen,
          },
        ],
      }),
    );
  };

  useEffect(() => {
    getLoginData();
  }, []);

  return <View />;
};

export default LandingScreen;
