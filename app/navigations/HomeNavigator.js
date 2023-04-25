import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/detailscreen/DetailScreen';
import CreateNoteScreen from '../screens/createnotescreen/CreateNoteScreen';
import NAVIGATION_COMPONENT from '../utils/navConstants';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
    // screenOptions={{
    //     headerShown: false
    // }}
    >
      <Stack.Screen
        name={NAVIGATION_COMPONENT.HOME_SCREEN}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NAVIGATION_COMPONENT.CREATE_NOTE_SCREEN}
        component={CreateNoteScreen}
      />
      <Stack.Screen
        name={NAVIGATION_COMPONENT.DETAIL_NOTE_SCREEN}
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
