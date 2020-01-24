import axios from 'axios';

const api = () => {
  return axios.create({
    baseURL: 'http://10.0.2.2:3333',
  });
};

export default api;
