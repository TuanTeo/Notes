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
import {logUtils} from '../../utils/logUtils';
import NAVIGATION_COMPONENT from '../../utils/navConstants';
import {
  createMessageSignature,
  verifyMessageSignature,
} from '../../utils/secretUtils';
import {useUserStore} from '../../stores/userStore';
import {observer} from 'mobx-react-lite';
import {showToast} from "../../components/toast/Toast";

export default LoginScreen = observer(({navigation}) => {
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true)
  const [inValidMessage, setinValidMessage] = useState('')

  const userStore = useUserStore();
  const rnBiometrics = new ReactNativeBiometrics();

  const validInfo = () => {
    if (userName) {
      if (pass) {
            setIsValid(true)
            return true
        } else {
        setinValidMessage('Chưa nhập mật khẩu!')
      }
    } else {
      setinValidMessage('Chưa nhập User name!')
    }
    setIsValid(false)
    return false
  }

  useEffect(() => {
    getUserStore();
  }, []);

  const getUserStore = async () => {
    try {
      const value = await AsyncStorage.getItem('userName');
      if (value) {
        setUserName(value);
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
            logUtils('encode: ' + encode);
            verifyMessageSignature(signature, encode).then(result => {
              logUtils('verify:' + result);
            });
          });
        }
      });
  }

  const handleLogin = async () => {
    const body = {
      user_name: userName,
      user_password: pass,
    };
    setLoading(true);
    try {
      const res = await login(body);
      console.log('res', res);
      if (res?.data.token) {
        setToken(res?.data.token);
        await AsyncStorage.setItem('userName', userName);
        userStore.setUser(res?.data?.user_id || '');
        navigation.navigate(NAVIGATION_COMPONENT.DRAWER_NAV);
        // showToast('Success');
      } else {
        setIsValid(false)
        setinValidMessage('Sai thông tin đăng nhập!')
        // showToast('Fail');
      }
    } catch (error) {}
    setLoading(false);
    // const test = JSON.parse('res', JSON.parse(res));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text_input}
        label="Username"
        mode="outlined"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.text_input}
        label="Password"
        mode="outlined"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />

      {isValid ? null : (
        <Text style={styles.invalidText}>{inValidMessage}</Text>
      )}

      <View style={styles.button_login_container}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            mode="contained"
            onPress={() => {
              if (validInfo()) {
                handleLogin();
              }
            }}>
            Đăng nhập
          </Button>
        )}
        <TouchableOpacity
          style={styles.fingerButton}
          onPress={() => {
            logUtils('Fingerprint');

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
            logUtils('SignUp');
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
  invalidText: {
    color: 'red'
  }
});
