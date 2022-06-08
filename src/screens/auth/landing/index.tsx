import React, {useEffect} from 'react';
import {View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {isEmpty} from 'lodash';

import {screenString} from '../../../helpers/strings';
import {useDispatch, useSelector} from 'react-redux';
import {updateLanguage} from '../../../actions/languageAction';
import {LANGUAGE} from '../../../actions/types';
import I18n from 'react-native-i18n';

interface props {
  navigation: any;
}

const LandingScreen: React.FC<props> = ({navigation}) => {
  const {allUserData, isLanguage} = useSelector(state => state.auth);

  const dispatch = useDispatch();

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
    dispatch({type: LANGUAGE, payload: isLanguage ? 'fr' : 'en'});
    getLoginData();
  }, []);

  return <View />;
};

export default LandingScreen;
