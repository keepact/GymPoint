import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { helpOrderCreate } from '~/services/helporder';

import { listSupportRequest } from '../list';

import { Types, createSupportSuccess, createSupportFailure } from './index';

export function* createAnswer({ payload }) {
  try {
    const { id } = payload;
    const { answer } = payload.data;

    const supportAnswer = {
      id,
      answer,
    };

    const response = yield call(helpOrderCreate, supportAnswer);

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
