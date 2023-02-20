import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default App = () => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.text_input}
                placeholder="Nhập tên Trang béo!"
                // onChangeText={newText => setText(newText)}
            />
            <Text>Hello Trang Hấp</Text>
            <TextInput
                style={styles.text_input}
                placeholder="Nhập mật khẩu Trang béo!"
                // onChangeText={newText => setText(newText)}
            />
            <Text>Hello Trang Hấp</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    text_input: {
        height: 40, 
        width: '60%',
        borderWidth: 2,
        padding: 6
    }
});