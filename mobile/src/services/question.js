import api from './api';

export const questionList = id =>
  api().request({
    url: `students/${id}/help-orders`,
    method: 'GET',
  });

export const questionCreate = data =>
  api().request({
    url: `students/${data.id}/help-orders`,
    method: 'POST',
    data: {
      question: data.data,
    },
  });
