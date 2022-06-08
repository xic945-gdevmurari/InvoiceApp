import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  DashBoardScreen,
  LandingScreen,
  MPINScreen,
  RegisterScreen,
  SetMPINScreen,
} from '../screens';
import {screenString} from '../helpers/strings';
import {DARK_THEME, LIGHT_THEME} from '../helpers/utils';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const {isDarkTheme} = useSelector(state => state?.auth);

  const DarkTheme = {
    colors: {
      ...DARK_THEME,
    },
  };

  const lightTheme = {
    colors: {
      ...LIGHT_THEME,
    },
  };

  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : lightTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          orientation: 'portrait',
        }}
        initialRouteName={screenString.landing}>
        <Stack.Screen name={screenString.landing} component={LandingScreen} />
        <Stack.Screen
          name={screenString.registerScreen}
          component={RegisterScreen}
        />
        <Stack.Screen
          name={screenString.setMPINScreen}
          component={SetMPINScreen}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name={screenString.mPinScreen}
          component={MPINScreen}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name={screenString.dashboardScreen}
          component={DashBoardScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
