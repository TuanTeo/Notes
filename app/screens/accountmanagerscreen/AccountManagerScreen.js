import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

const AccountManagerScreen = props => {
  const [email, setEmail] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text_input}
        label="AccountManagerScreen"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.button_login_container}>
        <Button mode="contained" onPress={() => {}}>
          Xác nhận
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
  forgetPasswordButton: {
    marginTop: 10,
  },
  signupArea: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '10%',
  },
});

export default AccountManagerScreen;
