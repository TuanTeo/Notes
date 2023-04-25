import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';

const ForgotPasswordScreen = props => {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  return (
    <View style={styles.container}>
      <Text>Nhập email khôi phục</Text>
      <TextInput
        style={styles.text_input}
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.button_login_container}>
        <Button mode="contained" onPress={() => {
          navigation.pop()
        }}>
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

export default ForgotPasswordScreen;
