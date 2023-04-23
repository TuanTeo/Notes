import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

const SignUpScreen = props => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');

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

      <View style={styles.button_login_container}>
        <Button mode="contained" onPress={() => {}}>
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
    marginTop: 5,
  },
  loginButton: {
    width: '100%',
  },
  fingerButton: {
    alignSelf: 'center',
    position: 'absolute',
    left: '33%',
  },
});

export default SignUpScreen;
