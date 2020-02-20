import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { helpOrderList } from '~/services/helporder';

import { Types } from './index';

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

    yield put({
      type: Types.LIST_QUESTIONS_SUCCESS,
      payload: { questions, pages },
    });
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.LIST_QUESTIONS_FAILURE,
    });
  }
}

export default all([takeLatest(Types.LIST_QUESTIONS_REQUEST, listSupport)]);
