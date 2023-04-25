import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import ForgotPasswordScreen from '../screens/forgotpasswordscreen/ForgotPasswordScreen';
import SignUpScreen from '../screens/signupscreen/SignUpScreen';
import NAVIGATION_COMPONENT from '../utils/navConstants';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name={NAVIGATION_COMPONENT.LOGIN_SCREEN}
        component={LoginScreen}
      />
      <Stack.Screen
        name={NAVIGATION_COMPONENT.SIGN_UP_SCREEN}
        component={SignUpScreen}
      />
      <Stack.Screen
        name={NAVIGATION_COMPONENT.FORGOT_PASS_SCREEN}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
