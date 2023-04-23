import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
  AlertIOS,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {Button, Text, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import {login, setToken} from '../../services';
import {log} from '../../utils/logUtils';
import NAVIGATION_COMPONENT from '../../utils/navConstants';
import {
  createMessageSignature,
  verifyMessageSignature,
} from '../../utils/secretUtils';
import {useUserStore} from '../../stores/userStore';
import {observer} from 'mobx-react-lite';

export default LoginScreen = observer(({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const userStore = useUserStore();
  const rnBiometrics = new ReactNativeBiometrics();

  useEffect(() => {
    getUserStore();
  }, []);

  const getUserStore = async () => {
    try {
      const value = await AsyncStorage.getItem('userName');
      if (value) {
        setEmail(value);
        console.log('value', value);
      }
    } catch (error) {}
  };

  function getBiometricSignature() {
    // Todo sinh signature biometric va gui len server, luu lai vao store de dung sau
    rnBiometrics
      .createSignature({
        promptMessage: 'Đăng nhập',
        payload: '5',
      })
      .then(resultObject => {
        const {success, signature} = resultObject;

        if (success) {
          console.log('signature: ' + signature);
          createMessageSignature(signature).then(encode => {
            /* Da co chu ky su dung private key */
            log('encode: ' + encode);
            verifyMessageSignature(signature, encode).then(result => {
              log('verify:' + result);
            });
          });
        }
      });
  }

  const handleLogin = async () => {
    const body = {
      user_name: email,
      user_password: pass,
    };
    setLoading(true);
    try {
      const res = await login(body);
      console.log('res', res);
      if (res?.data.token) {
        setToken(res?.data.token);
        await AsyncStorage.setItem('userName', email);
        userStore.setUser(res?.data?.user_id || '');
        navigation.navigate(NAVIGATION_COMPONENT.DRAWER_NAV);
        AlertIOS.alert('Success');
      } else {
        AlertIOS.alert('Fail');
      }
    } catch (error) {}
    setLoading(false);
    // const test = JSON.parse('res', JSON.parse(res));
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.button_login_container}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            mode="contained"
            onPress={() => {
              // log('Đăng nhập');
              // navigation.navigate(NAVIGATION_COMPONENT.DRAWER_NAV);
              handleLogin();
            }}>
            Đăng nhập
          </Button>
        )}
        <TouchableOpacity
          style={styles.fingerButton}
          onPress={() => {
            log('Fingerprint');

            rnBiometrics.isSensorAvailable().then(resultObject => {
              const {available, biometryType} = resultObject;

              if (available && biometryType === BiometryTypes.TouchID) {
                console.log('TouchID is supported');
                getBiometricSignature();
              } else if (available && biometryType === BiometryTypes.FaceID) {
                console.log('FaceID is supported');
                getBiometricSignature();
              } else if (
                available &&
                biometryType === BiometryTypes.Biometrics
              ) {
                console.log('Biometrics is supported');
                getBiometricSignature();
              } else {
                console.log('Biometrics not supported');
              }
            });
          }}>
          <Icon name="fingerprint" size={30} color="#6200ff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log('Tuanteo', login());
          navigation.navigate(NAVIGATION_COMPONENT.FORGOT_PASS_SCREEN);
        }}
        style={styles.forgetPasswordButton}>
        <Text style={{color: 'blue'}}>Quên mật khẩu</Text>
      </TouchableOpacity>

      <View style={styles.signupArea}>
        <Text>Bạn chưa có tài khoản? </Text>
        <TouchableOpacity
          onPress={() => {
            log('SignUp');
            navigation.navigate(NAVIGATION_COMPONENT.SIGN_UP_SCREEN);
          }}>
          <Text style={{color: 'blue'}}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_input: {
    width: '70%',
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
