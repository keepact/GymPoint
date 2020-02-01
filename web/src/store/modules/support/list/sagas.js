import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { requestFailMessage } from '~/util/validation';

import { helpOrderList } from '~/services/helporder';

import { Types, listSupportSuccess, listSupportFailure } from './index';

export function* listSupport({ payload }) {
  try {
    const { page } = payload;

    const response = yield call(helpOrderList, page);

    const questions = response.data.content.rows.map(support => ({
      questionId: support.id,
      id: support.student_id,
      name: support.student.name,
      question: support.question,
    }));

    const pages = {
      currentPage: page,
      lastPage: response.data.lastPage,
    };

    yield put(listSupportSuccess(questions, pages));
  } catch (err) {
    toast.error(requestFailMessage);
    yield put(listSupportFailure());
  }
}

export default all([takeLatest(Types.LIST_QUESTIONS_REQUEST, listSupport)]);
