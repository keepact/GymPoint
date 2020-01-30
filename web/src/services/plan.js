import api from './api';

export const planList = page =>
  api().request({
    url: 'plans',
    method: 'GET',
    params: {
      page,
    },
  });

export const planListId = id =>
  api().request({
    url: 'plans',
    method: 'GET',
    params: {
      id,
    },
  });

export const planCreate = data =>
  api().request({
    url: 'plans',
    method: 'POST',
    data: {
      id: data.id,
      title: data.title,
      duration: data.duration,
      price: data.price,
    },
  });

export const planUpdate = data =>
  api().request({
    url: `/plans/${data.id}`,
    method: 'PUT',
    data: {
      id: data.id,
      title: data.title,
      duration: data.duration,
      price: data.price,
    },
  });

export const planDelete = id =>
  api().request({
    url: `plans/${id}`,
    method: 'DELETE',
  });
