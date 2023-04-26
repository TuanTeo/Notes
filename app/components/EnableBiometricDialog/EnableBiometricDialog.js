import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from "react-native";
import ReactNativeBiometrics, {BiometryTypes} from "react-native-biometrics";
import {createMessageSignature, verifyMessageSignature} from "../../utils/secretUtils";
import {logUtils} from "../../utils/logUtils";

const EnableBiometricDialog = (props) => {
  const rnBiometrics = new ReactNativeBiometrics();

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
              onPress={() => getBiometric()}>
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