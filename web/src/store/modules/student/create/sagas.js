import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { parseInteger } from '~/util/format';

import history from '~/services/history';
import api from '~/services/api';

import { Types, createStudentSuccess, createStudentFailure } from './student';

export function* createStudent({ payload }) {
  try {
    const {
      name,
      email,
      age,
      height_formatted,
      weight_formatted,
    } = payload.data;

    const student = {
      name,
      email,
      age,
      height: parseInteger(height_formatted, 'height'),
      weight: parseInteger(weight_formatted),
    };
    const response = yield call(api.post, 'students', student);

    toast.success('Estudante criado com sucesso');

    yield put(createStudentSuccess(response.data));
    history.push('/students');
  } catch (err) {
    toast.error('Error ao criar o estudante, confira os dados');
    yield put(createStudentFailure());
  }
}

export default all([takeLatest(Types.REQUEST, createStudent)]);
