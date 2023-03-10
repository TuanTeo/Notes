import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/detailscreen/DetailScreen';
import CreateNoteScreen from '../screens/createnotescreen/CreateNoteScreen';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
    // screenOptions={{
    //     headerShown: false
    // }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateNote" component={CreateNoteScreen} />
      <Stack.Screen name="DetailNote" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
