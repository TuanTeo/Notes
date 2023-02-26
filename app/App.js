import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen/index.js";
import 'react-native-gesture-handler';
import DrawerNav from "./drawers/DrawerNav.js";

const Stack = createNativeStackNavigator();

export default App = () => {
    // Cấu hình Navigation
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen 
                    name="Login"
                    component={LoginScreen}
                />
                <Stack.Screen 
                    name="MainDrawerNav"
                    component={DrawerNav}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}