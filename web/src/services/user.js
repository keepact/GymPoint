import api from './api';

export const profileUpdate = data =>
  api().request({
    url: 'users',
    method: 'PUT',
    data,
  });
