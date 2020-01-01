import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { requestFailMessage } from '~/util/validation';

import api from '~/services/api';

import { Types, listSupportSuccess, listSupportFailure } from './support';

export function* listSupport({ payload }) {
  try {
    const { page, newList } = payload;

    if (!newList) {
      const response = yield call(api.get, '/students/help-orders/answers', {
        params: { page },
      });

      const questions = response.data.content.rows.map(support => ({
        id: support.student_id,
        name: support.student.name,
        question: support.question,
      }));

      const pages = {
        currentPage: page,
        lastPage: response.data.lastPage,
      };

      yield put(listSupportSuccess(questions, pages));
    } else {
      const questions = newList.currentQuestions.map(support => ({
        id: support.id,
        name: support.name,
        question: support.question,
      }));

      const pages = {
        currentPage: page,
        lastPage: newList.lastPage,
      };

      yield put(listSupportSuccess(questions, pages));
    }
  } catch (err) {
    toast.error(requestFailMessage);
    yield put(listSupportFailure());
  }
}

export default all([takeLatest(Types.REQUEST, listSupport)]);