import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { FAB, Text } from "react-native-paper";
import { colors } from "../../drawers/constant";
import { log } from "../../utils/logUtils";

export default HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.container}>
                    <TouchableOpacity  onPress={() => {log('Pressed container1'); navigation.navigate('DetailNote');}} >
                        <View style={styles.container1} ><Text>HIHIHIHIHIHIHIIHIHHIIHIH</Text></View>
                    </TouchableOpacity>
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
            <FAB
                style={styles.fab}
                small
                icon="plus"
                color="white"
                onPress={() => {log('Pressed FAB'); navigation.navigate('CreateNote');}}
            />
        </View>
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
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        marginBottom: 32,
        backgroundColor: colors.fab,
    }
});