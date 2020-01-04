import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { listSupportRequest } from '../list';

import { Types, createSupportSuccess, createSupportFailure } from './index';

export function* createAnswer({ payload }) {
  try {
    const { id } = payload;
    const { answer } = payload.data;

    const supportAnswer = {
      answer,
    };

    const response = yield call(
      api.post,
      `/students/help-orders/${id}/answer`,
      supportAnswer
    );

    toast.success('Resposta enviada com sucesso');

    if (response.status === 200) {
      yield put(listSupportRequest(1));
    }
    yield put(createSupportSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(createSupportFailure());
  }
}

export default all([takeLatest(Types.REQUEST, createAnswer)]);
