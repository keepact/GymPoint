import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Types, createSupportSuccess, createSupportFailure } from './support';

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

    yield put(createSupportSuccess(response.data));
  } catch (err) {
    toast.error('Error na hora de enviar a resposta, confira seus dados');
    yield put(createSupportFailure());
  }
}

export default all([takeLatest(Types.REQUEST, createAnswer)]);