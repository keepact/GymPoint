import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { helpOrderCreate } from '~/services/helporder';

import { listSupportRequest } from '../list';

import { Types, createSupportSuccess, createSupportFailure } from './index';

export function* createAnswer({ payload }) {
  const { id } = payload;
  const { answer } = payload.data;

  const supportAnswer = {
    id,
    answer,
  };

  try {
    const { data } = yield call(helpOrderCreate, supportAnswer);

    toast.success('Resposta enviada com sucesso');

    yield put(listSupportRequest(1));
    yield put(createSupportSuccess(data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(createSupportFailure());
  }
}

export default all([takeLatest(Types.CREATE_ANSWER_REQUEST, createAnswer)]);
