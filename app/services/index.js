import axios from 'axios';
import {log} from '../utils/logUtils';

const DOMAIN = 'http://127.0.0.1:5000';
// const DOMAIN = 'http://103.226.251.81:5000/'

let tokenValue = '';

const config = {
  headers: {
    token: tokenValue,
  },
};

export const setToken = token => {
  log('setToken value ' + token);
  config.headers.token = token;
};

/*************** API User *****************/
export const getUser = async () => {
  const res = await axios
    .get(DOMAIN + '/users', config)
    .then(response => console.log(response))
    .catch(err => console.log(err));
  return res;
};

export const login = async body => {
  const res = await axios.post(DOMAIN + '/login', body);
  return res;
};

/*************** API Task *****************/
export const getDetailTask = async () => {
  const res = await axios
    .get(DOMAIN + '/task/1', config)
    .then(response => console.log(response))
    .catch(err => console.log(err));
  return res;
};
