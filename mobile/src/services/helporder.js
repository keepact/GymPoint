import api from './api';

export const helpOrderListNoPage = data =>
  api().request({
    url: `students/${data.studentId || data.id}/help-orders`,
    method: 'GET',
  });

export const helpOrderList = data =>
  api().request({
    url: `students/${data.studentId || data.id}/help-orders`,
    method: 'GET',
    params: {
      page: data.page,
    },
  });

export const helpOrderCreate = data =>
  api().request({
    url: `students/${data.studentId}/help-orders`,
    method: 'POST',
    data: {
      question: data.data,
    },
  });
