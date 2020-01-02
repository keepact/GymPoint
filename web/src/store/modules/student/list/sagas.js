import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { parseDecimal } from '~/util/format';
import { requestFailMessage } from '~/util/validation';

import api from '~/services/api';

import {
  Types,
  listStudentSuccess,
  listStudentSuccessId,
  listStudentFailure,
} from './student';

export function* listStudentId({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, 'students', {
      params: { id },
    });
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
  } catch (err) {
    toast.error(requestFailMessage);
    yield put(listStudentFailure());
  }
}

export function* listStudents({ payload }) {
  const { page, newList } = payload;

  try {
    if (typeof newList !== 'object') {
      const response = yield call(api.get, 'students', {
        params: { page, q: newList },
      });

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
    } else {
      const students = newList.currentStudents.map(students => ({
        id: students.id,
        name: students.name,
        email: students.email,
        age: students.age,
      }));

      const pages = {
        currentPage: page,
        lastPage: newList.lastPage,
      };

      yield put(listStudentSuccess(students, pages));
    }
  } catch (err) {
    toast.error(requestFailMessage);
    yield put(listStudentFailure());
  }
}

export default all([
  takeLatest(Types.REQUEST, listStudents),
  takeLatest(Types.REQUEST_ID, listStudentId),
]);
