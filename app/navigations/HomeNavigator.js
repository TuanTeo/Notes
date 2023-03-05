import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import CreateNoteScreen from "../screens/CreateNoteScreen";

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
        </Stack.Navigator>
    );
}

export default HomeNavigator;