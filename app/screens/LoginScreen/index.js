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
import {login, requestBiometricLogin, setToken, verifyBiometricLogin} from '../../services';
import {logUtils} from '../../utils/logUtils';
import NAVIGATION_COMPONENT from '../../utils/navConstants';
import {
  createMessageSignature,
  verifyMessageSignature,
} from '../../utils/secretUtils';
import {useUserStore} from '../../stores/userStore';
import {observer} from 'mobx-react-lite';
import {showToast} from "../../components/toast/Toast";
import {ASYNC_STORE_KEY} from "../../constants/asyncStoreKey";
import {powermod} from "../../utils/byteUtils";
import bigInt from "big-integer";

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
      const value = await AsyncStorage.getItem(ASYNC_STORE_KEY.USER_NAME);
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
        await AsyncStorage.setItem(ASYNC_STORE_KEY.USER_NAME, userName);
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

  function getBiometric() {
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
  }

  const testBiometricLogin = async () => {
    // Todo x là private, p tạo khi bật settings (cố định), g tự tạo random từ p
    const x = 1101938n
    const g = 1000n
    const p = 254751455037992070664185365042702116014n
    const h = powermod(g, x, p)
    logUtils('h: ' + h);

    const r = bigInt.randBetween(2, p)
    logUtils('r: ' + r);

    const u = powermod(g, BigInt(r), p)
    logUtils('u: ' + u);

    const c = await sendBiometricSignature(h, u, g)
    // todo gửi h, u, g lên server và nhận lại c
    // const c = bigInt.randBetween(2, p)
    logUtils('c: ' + c);

    const z = BigInt(r) + BigInt(c) * x
    logUtils('z: ' + z);

    const isVerify = await verifyBiometricProof(z)
    // todo gửi z lên server và nhận kết quả
    logUtils('VT: ' + powermod(g, BigInt(z), p));
    logUtils('VP: ' + (u * powermod(h,BigInt(c),p)) % p);
  }

  const sendBiometricSignature = async (h, u, g) => {
    const body = {
      user_name: userName,
      h: h + '',
      u: u + '',
      g: g + ''
    };

    try {
      const res = await requestBiometricLogin(body);
      logUtils('requestBiometricLogin res: ' + res)
      if (res?.data) {
        return res.data
      }
    } catch (error) {
      logUtils('requestBiometricLogin error: ' + error)
    }
    return null
  };

  const verifyBiometricProof = async (z) => {
    const body = {
      user_name: userName,
      z: z + ''
    };

    try {
      const res = await verifyBiometricLogin(body);
      logUtils('verifyBiometricLogin res: ' + res)
      if (res?.data.token) {
        setToken(res?.data.token);
        await AsyncStorage.setItem(ASYNC_STORE_KEY.USER_NAME, userName);
        userStore.setUser(res?.data?.user_id || '');
        navigation.navigate(NAVIGATION_COMPONENT.DRAWER_NAV);
      } else {
        setIsValid(false)
        setinValidMessage('Sai thông tin sinh trắc!')
      }
    } catch (error) {
      logUtils('verifyBiometricLogin error: ' + error)
    }
    return false
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
            // getBiometric()
            testBiometricLogin()
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
