import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "../../drawers/constant";

export default HomeScreen = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.container1}><Text>HIHIHIHIHIHIHIIHIHHIIHIH</Text></View>
                <View style={styles.container1}><Text>HIHIHIHIHIHIHIIHIHHIIHIH</Text></View>
                <View style={styles.container1}><Text>HIHIHIHIHIHIHIIHIHHIIHIH</Text></View>
                <View style={styles.container1}><Text>HIHIHIHIHIHIHIIHIHHIIHIH</Text></View>
                <View style={styles.container1}><Text>HIHIHIHIHIHIHIIHIHHIIHIH</Text></View>
                <View style={styles.container1}><Text>HIHIHIHIHIHIHIIHIHHIIHIH</Text></View>
                <View style={styles.container1}><Text>HIHIHIHIHIHIHIIHIHHIIHIH</Text></View>
                <View style={styles.container1}><Text>HIHIHIHIHIHIHIIHIHHIIHIH</Text></View>
                <View style={styles.container1}><Text>HIHIHIHIHIHIHIIHIHHIIHIH</Text></View>
                <View style={styles.container1}><Text>HIHIHIHIHIHIHIIHIHHIIHIH</Text></View>
                <View style={styles.container1}><Text>HIHIHIHIHIHIHIIHIHHIIHIH</Text></View>
                <View style={styles.container1}><Text>HIHIHIHIHIHIHIIHIHHIIHIH</Text></View>
                <View style={styles.container1}><Text>HIHIHIHIHIHIHIIHIHHIIHIH</Text></View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        rowGap: 8,
    },
    container1: {
        height: 100,
        backgroundColor: colors.white,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center'
    }
});