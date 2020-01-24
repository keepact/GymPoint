import api from './api';

export const checkinList = id =>
  api().request({
    url: `students/${id}/checkins`,
    method: 'GET',
  });

export const checkinCreate = id =>
  api().request({
    url: `students/${id}/checkins`,
    method: 'POST',
  });
