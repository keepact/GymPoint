import api from './api';

export const studentList = data =>
  api().request({
    url: 'students',
    method: 'GET',
    params: {
      page: data.page,
      q: data.newList || '',
    },
  });

export const studentListId = id =>
  api().request({
    url: 'students',
    method: 'GET',
    params: {
      id,
    },
  });

export const studentCreate = data =>
  api().request({
    url: 'students',
    method: 'POST',
    data: {
      name: data.name,
      email: data.email,
      age: data.age,
      height: data.height,
      weight: data.weight,
    },
  });

export const studentUpdate = data =>
  api().request({
    url: `/students/${data.id}`,
    method: 'PUT',
    data: {
      name: data.name,
      email: data.email,
      age: data.age,
      height: data.height,
      weight: data.weight,
    },
  });

export const studentDelete = id =>
  api().request({
    url: `students/${id}`,
    method: 'DELETE',
  });
