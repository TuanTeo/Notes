import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen/index.js";
import LoginScreen from "./screens/LoginScreen/index.js";

const Stack = createNativeStackNavigator();

export default App = () => {
    // return (
    //     <LoginScreenJs />
    // );

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
                    name="Home"
                    component={HomeScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}