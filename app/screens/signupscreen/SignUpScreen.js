import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {AlertIOS, StyleSheet, Text, View} from 'react-native';
import {signUp} from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {logUtils} from "../../utils/logUtils";
import {showToast} from "../../components/toast/Toast";

const SignUpScreen = props => {
  const { navigation } = props;

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const [loading, setLoading] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const [inValidMessage, setinValidMessage] = useState('')

  const validPassword = () => {
    if (userName) {
      if (email) {
        if (pass && rePass) {
          if (pass === rePass) {
            setIsValid(true)
            return true
          } else {
            setinValidMessage('Mật khẩu không khớp!')
          }
        } else {
          setinValidMessage('Chưa nhập mật khẩu!')
        }
      } else {
        setinValidMessage('Chưa nhập Email!')
      }
    } else {
      setinValidMessage('Chưa nhập User name!')
    }
    setIsValid(false)
    return false
  }

  const handleSignUp = async () => {
    const body = {
      user_name: userName,
      user_email: email,
      user_password: pass,
    };
    setLoading(true);
    try {
      const res = await signUp(body);
      if (res?.data) {
        logUtils('signUp', res)
        await AsyncStorage.setItem('userName', userName);
        navigation.pop();
        showToast('Success');
      } else {validPassword()
        showToast('Fail');
      }
    } catch (error) {}
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text_input}
        label="User name"
        mode="outlined"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.text_input}
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.text_input}
        label="Password"
        mode="outlined"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />
      <TextInput
        style={styles.text_input}
        label="Re-enter password"
        mode="outlined"
        secureTextEntry
        value={rePass}
        onChangeText={setRePass}
      />

      {isValid ? null : (
        <Text style={styles.invalidText}>{inValidMessage}</Text>
      )}

      <View style={styles.button_login_container}>
        <Button mode="contained" onPress={() => {
          if (validPassword()) {
            handleSignUp()
          }
        }}>
          Đăng ký
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_input: {
    width: '80%',
    marginBottom: 5,
  },
  button_login_container: {
    flexDirection: 'row',
    marginTop: 8,
  },
  loginButton: {
    width: '100%',
  },
  fingerButton: {
    alignSelf: 'center',
    position: 'absolute',
    left: '33%',
  },
  invalidText: {
    color: 'red'
  }
});

export default SignUpScreen;
