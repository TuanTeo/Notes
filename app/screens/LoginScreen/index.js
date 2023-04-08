import React from 'react';
import {StyleSheet, Touchable, TouchableOpacity, View} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {Button, Text, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import {log} from '../../utils/logUtils';
import NAVIGATION_COMPONENT from '../../utils/navConstants';
import {createMessageSignature, verifyMessageSignature} from "../../utils/secretUtils";

export default LoginScreen = ({navigation}) => {
  const rnBiometrics = new ReactNativeBiometrics();

  function getBiometricSignature() {
    // Todo sinh signature biometric va gui len server, luu lai vao store de dung sau
    rnBiometrics.createSignature({
      promptMessage: 'Đăng nhập',
      payload: '5'
    })
      .then((resultObject) => {
        const {success, signature} = resultObject

        if (success) {
          console.log('signature: ' + signature)
          createMessageSignature(signature)
            .then(encode => {
              /* Da co chu ky su dung private key */
              log("encode: " + encode)
              verifyMessageSignature(signature, encode)
                .then(result => { log('verify:' + result) })
            })
        }
      })
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.text_input} label="Email" mode="outlined" />
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
            log('Đăng nhập');
            navigation.navigate(NAVIGATION_COMPONENT.DRAWER_NAV);
          }}>
          Đăng nhập
        </Button>
        <TouchableOpacity
          style={styles.fingerButton}
          onPress={() => {
            log('Fingerprint');

            rnBiometrics.isSensorAvailable().then(resultObject => {
              const {available, biometryType} = resultObject;

              if (available && biometryType === BiometryTypes.TouchID) {
                console.log('TouchID is supported');
                getBiometricSignature()
              } else if (available && biometryType === BiometryTypes.FaceID) {
                console.log('FaceID is supported');
                getBiometricSignature()
              } else if (available && biometryType === BiometryTypes.Biometrics) {
                console.log('Biometrics is supported');
                getBiometricSignature()
              } else {
                console.log('Biometrics not supported');
              }
            });
          }}>
          <Icon name="fingerprint" size={30} color="#6200ff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => log('Forget password')}
        style={styles.forgetPasswordButton}>
        <Text style={{color: 'blue'}}>Quên mật khẩu</Text>
      </TouchableOpacity>

      <View style={styles.signupArea}>
        <Text>Bạn chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => log('SignUp')}>
          <Text style={{color: 'blue'}}>Đăng ký</Text>
        </TouchableOpacity>
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
