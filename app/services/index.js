import axios from 'axios';

const config = {
  headers: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ0dWFudHF0IiwidXNlcl9pZCI6NH0.hAF8EPFmB1NXTLZivZFN3y4Hv2RHcl5VXVhshzfQTFg',
  },
};

export const getUser = async () => {
  const res = await axios
    .get('http://127.0.0.1:5000/users', config)
    .then(response => console.log(response))
    .catch(err => console.log(err));
  return res;
};

export const login = async body => {
  const res = await axios.post('http://127.0.0.1:5000/login', body);
  // .then(response => console.log(JSON.stringify(response)))
  // .catch(err => console.log(err));

  return res;
};
