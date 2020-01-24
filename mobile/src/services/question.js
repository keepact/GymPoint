import api from './api';

export const questionList = id =>
  api().request({
    url: `students/${id}/help-orders`,
    method: 'GET',
  });

export const questionCreate = id =>
  api().request({
    url: `students/${id}/help-orders`,
    method: 'POST',
  });
