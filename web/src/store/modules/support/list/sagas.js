import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { helpOrderList } from '~/services/helporder';

import { Types, listSupportSuccess, listSupportFailure } from './index';

export function* listSupport({ payload }) {
  const { page } = payload;

  try {
    const { data } = yield call(helpOrderList, page);

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

    yield put(listSupportSuccess(questions, pages));
  } catch (err) {
    toast.error(err.data.error);
    yield put(listSupportFailure());
  }
}

export default all([takeLatest(Types.LIST_QUESTIONS_REQUEST, listSupport)]);
