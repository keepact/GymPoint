import api from './api';

export const helpOrderList = id =>
  api().request({
    url: `students/${id}/help-orders`,
    method: 'GET',
  });

export const helpOrderCreate = data =>
  api().request({
    url: `students/${data.id}/help-orders`,
    method: 'POST',
    data: {
      question: data.data,
    },
  });
