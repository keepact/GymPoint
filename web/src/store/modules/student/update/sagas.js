import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { parseInteger } from '~/util/format';

import history from '~/services/history';
import api from '~/services/api';

import { Types, updateStudentSuccess, updateStudentFailure } from './student';

export function* updateStudent({ payload }) {
  try {
    const {
      name,
      email,
      age,
      height_formatted,
      weight_formatted,
    } = payload.data;

    const { id } = payload;

    const student = {
      name,
      email,
      age,
      height: parseInteger(height_formatted, 'height'),
      weight: parseInteger(weight_formatted),
    };
    const response = yield call(api.put, `/students/${id}`, student);

    toast.success('Estudante atualizado com sucesso');

    yield put(updateStudentSuccess(response.data));
    history.push('/students');
  } catch (err) {
    toast.error('Error ao atualizar o estudante, confira os dados');
    yield put(updateStudentFailure());
  }
}

export default all([takeLatest(Types.REQUEST, updateStudent)]);
