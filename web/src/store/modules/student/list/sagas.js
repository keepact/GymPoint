import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { parseDecimal } from '~/util/format';
import { requestFailMessage } from '~/util/validation';

import api from '~/services/api';

import { Types, listStudentSuccess, listStudentFailure } from './student';

export function* listStudent({ payload }) {
  try {
    const { id } = payload;
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
    yield put(listStudentSuccess(student));
  } catch (err) {
    toast.error(requestFailMessage);
    yield put(listStudentFailure());
  }
}

export default all([takeLatest(Types.REQUEST, listStudent)]);
