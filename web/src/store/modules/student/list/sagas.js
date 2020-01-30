import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { parseDecimal } from '~/util/format';
import { requestFailMessage } from '~/util/validation';

import history from '~/services/history';
import { studentList, studentListId } from '~/services/student';

import {
  Types,
  listStudentSuccess,
  listStudentSuccessId,
  listStudentFailure,
} from './index';

export function* listStudentId({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(studentListId, id);
    const { name, email, age, height, weight } = response.data;

    const student = {
      id,
      name,
      email,
      age,
      height_formatted: parseDecimal(height, 'height'),
      weight_formatted: parseDecimal(weight, 'weight'),
    };

    yield put(listStudentSuccessId(student));
    history.push('students/edit');
  } catch (err) {
    toast.error(requestFailMessage);
    yield put(listStudentFailure());
  }
}

export function* listStudents({ payload }) {
  const { page, newList } = payload;

  try {
    if (newList !== undefined) {
      yield delay(600);
    }
    const response = yield call(studentList, payload);

    const students = response.data.content.rows.map(students => ({
      id: students.id,
      name: students.name,
      email: students.email,
      age: students.age,
    }));

    const { lastPage } = response.data;

    const pages = {
      currentPage: page,
      lastPage,
    };

    yield put(listStudentSuccess(students, pages));
  } catch (err) {
    toast.error(requestFailMessage);
    yield put(listStudentFailure());
  }
}

export function studentInitialState() {
  history.push('students/create');
}

export function studentRedirect() {
  history.push('/');
}

export default all([
  takeLatest(Types.REQUEST, listStudents),
  takeLatest(Types.REQUEST_ID, listStudentId),
  takeLatest(Types.REQUEST_INITIAL_STATE, studentInitialState),
  takeLatest(Types.REDIRECT, studentRedirect),
]);
