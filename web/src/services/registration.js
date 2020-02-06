import api from './api';

export const registrationList = page =>
  api().request({
    url: 'registrations',
    method: 'GET',
    params: {
      page,
    },
  });

export const registrationListId = id =>
  api().request({
    url: `registrations/${id}`,
    method: 'GET',
  });

export const registrationPending = page =>
  api().request({
    url: 'registrations/pending/removed',
    method: 'GET',
    params: {
      page,
    },
  });

export const registrationCreate = data =>
  api().request({
    url: 'registrations',
    method: 'POST',
    data: {
      student_id: data.student_id,
      plan_id: data.plan_id,
      start_date: data.start_date,
    },
  });

export const registrationUpdate = data =>
  api().request({
    url: `registrations/${data.id}`,
    method: 'PUT',
    data: {
      student_id: data.student_id,
      plan_id: data.plan_id,
      start_date: data.start_date,
    },
  });

export const registrationDelete = id =>
  api().request({
    url: `registrations/${id}`,
    method: 'DELETE',
  });
