import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from "react-native";
import ReactNativeBiometrics, {BiometryTypes} from "react-native-biometrics";
import {logUtils} from "../../utils/logUtils";
import {powermod, stringToByteArray} from "../../utils/byteUtils";
import {addPublicKeyApi} from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ASYNC_STORE_KEY} from "../../constants/asyncStoreKey";
import {showToast} from "../toast/Toast";

const EnableBiometricDialog = (props) => {
  const rnBiometrics = new ReactNativeBiometrics();

  const registerBiometricAuth = async () => {
    const bioUserName = await AsyncStorage.getItem(ASYNC_STORE_KEY.USER_NAME)

    const body = {
      user_name: bioUserName,
    };

    try {
      const res = await addPublicKeyApi(body);
      console.log('res', res);
      if (res?.data.public_key) {
        await AsyncStorage.setItem(ASYNC_STORE_KEY.BIO_USER_NAME, bioUserName);
        await AsyncStorage.setItem(ASYNC_STORE_KEY.PUBLIC_KEY, res?.data.public_key + '');
        await AsyncStorage.setItem(ASYNC_STORE_KEY.GEN_KEY, res?.data.g + '');
        showToast('Đã bật tính năng!')
      } else {
        showToast('Có lỗi khi bật tính năng!')
      }
    } catch (error) {}
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

    props.setModalVisible(!props.modalVisible);
  }

  function getBiometricSignature() {
    // Todo call addPublicKeyApi và lưu public_key, gen vào db
    let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
    let payload = epochTimeSeconds + 'some message'
    rnBiometrics.biometricKeysExist()
      .then((resultObject) => {
        const { keysExist } = resultObject
        if (keysExist) {
          rnBiometrics
            .createSignature({
              promptMessage: 'Đăng nhập',
              payload: payload,
            })
            .then(resultObject => {
              const {success, signature} = resultObject;

              logUtils('x: ' + stringToByteArray(signature));

              if (success) {
                logUtils('signature: ' + signature);
                registerBiometricAuth()
              }
            });
        } else {
          rnBiometrics.createKeys()
            .then((resultObject) => {
              const { publicKey } = resultObject
              logUtils(publicKey)

              rnBiometrics
                .createSignature({
                  promptMessage: 'Đăng nhập',
                  payload: payload,
                })
                .then(resultObject => {
                  const {success, signature} = resultObject;

                  logUtils('x: ' + stringToByteArray(signature));

                  if (success) {
                    logUtils('signature: ' + signature);
                    registerBiometricAuth()
                  }
                });
            })
        }
      })
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Bật tính năng đăng nhập sử dụng sinh trắc học?</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.setModalVisible(!props.modalVisible)}>
              <Text style={styles.textStyle}>Huỷ</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => {
                getBiometric()
                // registerBiometricAuth()
              }}>
              <Text style={styles.textStyle}>Đồng ý</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#2196F3',

  },
  buttonClose: {
    backgroundColor: '#F194FF',
    marginEnd: 16
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 15
  },
});


export default EnableBiometricDialog