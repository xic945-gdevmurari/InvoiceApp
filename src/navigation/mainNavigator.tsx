import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  LandingScreen,
  LoginScreen,
  SignUpScreen,
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
        <Stack.Screen name={screenString.loginScreen} component={LoginScreen} />
        <Stack.Screen
          name={screenString.signUpScreen}
          component={SignUpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
