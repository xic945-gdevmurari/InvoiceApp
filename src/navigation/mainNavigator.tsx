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

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
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
        />
        <Stack.Screen name={screenString.mPinScreen} component={MPINScreen} />
        <Stack.Screen
          name={screenString.dashboardScreen}
          component={DashBoardScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
