import { RSA } from 'react-native-rsa-native';
import {KEYPAIR_SIZE} from "../constants/configs";

export const keypair = RSA.generateKeys(KEYPAIR_SIZE)

export async function createMessageSignature(message) {
  return RSA.sign(message, (await keypair).private)
}
export async function verifyMessageSignature(message, encode) {
  return RSA.verify(encode, message, (await keypair).public)
}