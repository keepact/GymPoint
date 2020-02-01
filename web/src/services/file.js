import api from './api';

export const uploadFile = data =>
  api().request({
    url: 'files',
    method: 'POST',
    data,
  });
