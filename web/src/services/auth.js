import api from './api';

export const authLogin = data =>
  api().request({
    url: 'sessions',
    method: 'POST',
    data: {
      email: data.email,
      password: data.password,
    },
  });
