import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { FAB, Text } from "react-native-paper";
import { colors } from "../../drawers/constant";
import { log } from "../../utils/logUtils";
import TaskItem from "../../components/task/TaskItem";

const CreateNoteScreen = () => {
    return (
        <View style={styles.container}>
            {/* <TextInput 
                style={styles.title_input}
                label="Title"
                mode="outlined"
            />
            <TextInput
                style={styles.content_input}
                label="Content"
                mode="outlined"
            />
            <FAB
                style={styles.fab}
                small
                icon="check"
                color="white"
                onPress={() => {log('Pressed FAB'); }}
            /> */}

            <TaskItem text={"Task 1"} />
            <TaskItem text={"Task 2"} />
            <TaskItem text={"Task 3"} />
            <TaskItem text={"Task 4"} />
            <TaskItem text={"Task 5"} />
            <TaskItem text={"Task 6"} />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
            >
                <TextInput style={styles.input} placeholder={"Write a task"} multiline={true} />
                <TouchableOpacity >
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    title_input: {
        backgroundColor: 'white',
        marginBottom: 12
    },
    content_input: {
        height: 500, 
        backgroundColor: 'white'
    },
    container: {
        padding: 12,
        flex: 1
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        marginBottom: 32,
        backgroundColor: colors.fab,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        width: '70%',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1
    },
    addText: {
        fontSize: 28
    }
});

export default CreateNoteScreen;