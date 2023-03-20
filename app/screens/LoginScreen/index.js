import React from 'react';
import {StyleSheet, Touchable, TouchableOpacity, View} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {Button, Text, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import {log} from '../../utils/logUtils';
import NAVIGATION_COMPONENT from '../../utils/navConstants';
import FingerprintScanner from 'react-native-fingerprint-scanner';

export default LoginScreen = ({navigation}) => {
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

            const rnBiometrics = new ReactNativeBiometrics();

            rnBiometrics.isSensorAvailable().then(resultObject => {
              const {available, biometryType} = resultObject;

              if (available && biometryType === BiometryTypes.TouchID) {
                console.log('TouchID is supported');
              } else if (available && biometryType === BiometryTypes.FaceID) {
                console.log('FaceID is supported');
              } else if (
                available &&
                biometryType === BiometryTypes.Biometrics
              ) {
                console.log('Biometrics is supported');

                // Check đã có key chưa
                rnBiometrics.biometricKeysExist().then(resultObject => {
                  const {keysExist} = resultObject;

                  if (keysExist) {
                    console.log('Keys exist');
                    // Nếu chưa thì sinh key
                    FingerprintScanner.authenticate({
                      description: 'Authenticate to access this',
                    })
                      .then(() => {
                        // Method for Authentication
                        // onAuthenticate();
                        console.log('FingerprintScanner ok');
                      })
                      // Call error method
                      .catch(error => {
                        console.log('FingerprintScanner error');
                        onAuthenticationFailure(error);
                      });
                  } else {
                    console.log('Keys do not exist or were deleted');

                    // Nếu chưa thì sinh key
                    FingerprintScanner.authenticate({
                      description: 'Authenticate to access this',
                    })
                      .then(() => {
                        // Method for Authentication
                        // onAuthenticate();
                        console.log('FingerprintScanner ok');
                      })
                      // Call error method
                      .catch(error => onAuthenticationFailure(error));
                  }
                });
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
