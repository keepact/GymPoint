import { takeLatest, call, put, all } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';

import { toast } from 'react-toastify';

import * as helpOrderService from '~/services/helporder';
import { Types, getAllSupportQuestions } from '../ducks/helporder';

export function* listSupport({ payload }) {
  const { page } = payload;

  try {
    const { data } = yield call(helpOrderService.helpOrderList, page);

    const questions = data.content.rows.map(support => ({
      questionId: support.id,
      id: support.student_id,
      name: support.student.name,
      question: support.question,
    }));

    const pages = {
      currentPage: page,
      lastPage: data.lastPage,
    };

    yield put({
      type: Types.LIST_QUESTIONS_SUCCESS,
      payload: { questions, pages },
    });
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.QUESTION_LOADED,
    });
  }
}

export function* createAnswer({ payload }) {
  const { id } = payload;
  const { answer } = payload.data;

  const supportAnswer = {
    id,
    answer,
  };

  yield put(startSubmit('HELPORDER_FORM'));
  try {
    yield call(
      helpOrderService.helpOrderCreate,
      supportAnswer
    );

    toast.success('Resposta enviada com sucesso');

    yield put(stopSubmit('HELPORDER_FORM'));
    yield put(getAllSupportQuestions(1));

    yield put({
      type: Types.QUESTION_LOADED,
    });
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.QUESTION_LOADED,
    });
  }
}

export default all([
  takeLatest(Types.LIST_QUESTIONS_REQUEST, listSupport),
  takeLatest(Types.CREATE_ANSWER_REQUEST, createAnswer),
]);
