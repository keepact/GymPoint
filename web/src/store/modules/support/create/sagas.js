import { takeLatest, call, put, all } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';

import { toast } from 'react-toastify';

import { helpOrderCreate } from '~/services/helporder';

import { getAllSupportQuestions } from '../list';

import { Types } from './index';

export function* createAnswer({ payload }) {
  const { id } = payload;
  const { answer } = payload.data;

  const supportAnswer = {
    id,
    answer,
  };

  yield put(startSubmit('HELPORDER_FORM'));
  try {
    const { data } = yield call(helpOrderCreate, supportAnswer);

    toast.success('Resposta enviada com sucesso');

    yield put(stopSubmit('HELPORDER_FORM'));
    yield put(getAllSupportQuestions(1));

    yield put({
      type: Types.CREATE_ANSWER_SUCCESS,
      payload: { data },
    });
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.CREATE_ANSWER_FAILURE,
    });
  }
}

export default all([takeLatest(Types.CREATE_ANSWER_REQUEST, createAnswer)]);
