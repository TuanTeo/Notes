import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ArchivedScreen from '../screens/archivedscreen/ArchivedScreen';
import DetailScreen from '../screens/detailscreen/DetailScreen';

import NAVIGATION_COMPONENT from '../utils/navConstants';

const Stack = createNativeStackNavigator();

const ArchivedNavigator = () => {
  return (
    <Stack.Navigator
    // screenOptions={{
    //     headerShown: false
    // }}
    >
      <Stack.Screen
        name={NAVIGATION_COMPONENT.ARCHIVED_SCREEN}
        component={ArchivedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NAVIGATION_COMPONENT.DETAIL_NOTE_SCREEN}
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};

export default ArchivedNavigator;
