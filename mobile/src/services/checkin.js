import api from './api';

export const checkinListNoPage = data =>
  api().request({
    url: `students/${data.studentId || data.id}/checkins`,
    method: 'GET',
  });

export const checkinList = data =>
  api().request({
    url: `students/${data.studentId || data.id}/checkins`,
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
