import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import DetailScreen from '../screens/detailscreen/DetailScreen';
import TrashScreen from '../screens/trashscreen/TrashScreen';
import NAVIGATION_COMPONENT from '../utils/navConstants';

const Stack = createNativeStackNavigator();

const TrashNavigator = () => {
  return (
    <Stack.Navigator
    // screenOptions={{
    //     headerShown: false
    // }}
    >
      <Stack.Screen
        name={NAVIGATION_COMPONENT.TRASH_SCREEN}
        component={TrashScreen}
      />
      <Stack.Screen
        name={NAVIGATION_COMPONENT.DETAIL_NOTE_SCREEN}
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};

export default TrashNavigator;
