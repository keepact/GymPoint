import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { parseDecimal } from '~/util/format';

import history from '~/services/history';
import { studentList, studentListId } from '~/services/student';

import {
  Types,
  listStudentSuccess,
  listStudentSuccessId,
  listStudentFailure,
} from './index';

export function* listStudentById({ payload }) {
  const { id } = payload;

  try {
    const { data } = yield call(studentListId, id);
    const { name, email, age, height, weight } = data;

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
    toast.error(err.response.data.error);
    yield put(listStudentFailure());
  }
}

export function* listStudents({ payload }) {
  const { page, newList } = payload;

  if (newList !== undefined) {
    yield delay(600);
  }

  try {
    const { data } = yield call(studentList, payload);

    const students = data.content.rows.map(students => ({
      id: students.id,
      name: students.name,
      email: students.email,
      age: students.age,
    }));

    const { lastPage } = data;

    const pages = {
      currentPage: page,
      lastPage,
    };

    yield put(listStudentSuccess(students, pages));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(listStudentFailure());
  }
}

export function studentRedirect() {
  history.push('/');
}

export function studentInitialState() {
  history.push('students/create');
}

export default all([
  takeLatest(Types.LIST_STUDENTS_REQUEST, listStudents),
  takeLatest(Types.LIST_STUDENT_ID_REQUEST, listStudentById),
  takeLatest(Types.STUDENT_REDIRECT, studentRedirect),
  takeLatest(Types.UPDATE_STUDENT_INITIAL_STATE, studentInitialState),
]);
