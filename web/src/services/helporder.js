import api from './api';

export const helpOrderList = page =>
  api().request({
    url: '/students/help-orders/answers',
    method: 'GET',
    params: {
      page,
    },
  });

export const helpOrderCreate = data =>
  api().request({
    url: `/students/help-orders/${data.id}/answer`,
    method: 'POST',
    data: {
      answer: data.answer,
    },
  });
