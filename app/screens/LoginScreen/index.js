import React from "react";
import { StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import { log } from "../../utils/logUtils";

export default LoginScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.text_input}
                label="Email"
                mode="outlined"
            />
            <TextInput
                style={styles.text_input}
                label="Password"
                mode="outlined"
                secureTextEntry
            />

            <View style={styles.button_login_container}>
            <Button 
                mode="contained"
                onPress={() => {
                    log("Đăng nhập");
                    navigation.navigate('Home');
                }}
                >
                Đăng nhập
            </Button>
            <TouchableOpacity 
                style={styles.fingerButton} 
                onPress={() => {log("Fingerprint");}}>
                <Icon name="fingerprint" size={30} color="#6200ff"/>
            </TouchableOpacity>
            </View>
            <TouchableOpacity 
                onPress={() => log('Forget password')}
                style={styles.forgetPasswordButton}>
                <Text style={{color: 'blue'}}>
                    Quên mật khẩu
                </Text>
            </TouchableOpacity>

            <View style={styles.signupArea}>
                <Text>Bạn chưa có tài khoản? </Text> 
                <TouchableOpacity 
                onPress={() => log('SignUp')}>
                <Text style={{color: 'blue'}}>
                    Đăng ký
                </Text>
            </TouchableOpacity>
            </View>
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
        width: '70%',
        marginBottom: 5
    },
    button_login_container: {
        flexDirection: 'row',
        marginTop: 5
    }, 
    loginButton: {
        width: '100%'
    },
    fingerButton: {
        alignSelf: 'center',
        position: "absolute",
        left: '33%'
    }, 
    forgetPasswordButton: {
        marginTop: 10
    }, 
    signupArea: {
        flexDirection: 'row',
        position: "absolute",
        bottom: '10%'
    }
});