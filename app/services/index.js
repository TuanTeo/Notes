import axios from 'axios';
import {logUtils} from '../utils/logUtils';

const DOMAIN = 'http://127.0.0.1:5000';
// const DOMAIN = 'http://103.226.251.81:5000/'

let tokenValue = '';

const config = {
  headers: {
    token: tokenValue,
  },
};

export const setToken = token => {
  logUtils('setToken value ' + token);
  config.headers.token = token;
};

/*************** API User *****************/
export const getUserById = async (userId) => {
  return await axios.get(DOMAIN + `/user/${userId}`, config)
};

export const login = async body => {
  try {
    const res = await axios.post(DOMAIN + '/login', body);
    return res;
  } catch (e) {
    return null;
  }
};

export const signUp = async body => {
  const res = await axios.post(DOMAIN + '/user/add', body);
  return res;
};

/*************** API Task *****************/
export const getTaskByUser = async (userId) => {
  const res = await axios.get(DOMAIN + `/task/${userId}`, config)
  return res;
};

export const createNewTaskApi = async (body) => {
  return await axios.post(DOMAIN + `/task/add`, body, config)
};

export const updateNewTaskApi = async (body) => {
  return await axios.post(DOMAIN + `/task/update`, body, config)
};

/*************** API Detail *****************/
export const getDetailByTaskId = async (taskId) => {
  return await axios.get(DOMAIN + `/detail/${taskId}`, config)
};

export const addDetailApi = async (body) => {
  return await axios.post(DOMAIN + `/detail/add`, body, config)
};

/*************** API Biometric *****************/
export const requestBiometricLogin = async (body) => {
  return await axios.post(DOMAIN + `/requestLogin`, body, config)
};

export const verifyBiometricLogin = async (body) => {
  return await axios.post(DOMAIN + `/verifyLogin`, body, config)
};

export const addPublicKeyApi = async (body) => {
  return await axios.post(DOMAIN + `/addPublicKey`, body, config)
};
