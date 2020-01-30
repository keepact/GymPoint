import axios from 'axios';

const api = () => {
  const userToken = localStorage.getItem('token');

  if (userToken) {
    return axios.create({
      baseURL: 'http://localhost:3333',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  }
  return axios.create({ baseURL: 'http://localhost:3333' });
};

export default api;
