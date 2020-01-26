import api from './api';

export const checkinList = data =>
  api().request({
    url: `students/${data.id}/checkins`,
    method: 'GET',
    params: {
      page: data.page,
    },
  });

export const checkinCreate = id =>
  api().request({
    url: `students/${id}/checkins`,
    method: 'POST',
  });
