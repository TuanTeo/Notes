import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { log } from "../../utils/logUtils";

const DetailScreen = () => {
    log("Show DetailScreen");
    return (
        <View>
            <Text>Detail Screen</Text>
        </View>
    );
}

export default DetailScreen;