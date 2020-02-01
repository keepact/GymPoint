import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { parseInteger } from '~/util/format';

import history from '~/services/history';
import { studentCreate, studentUpdate } from '~/services/student';

import {
  Types,
  updateOrCreateStudentSuccess,
  updateOrCreateStudentFailure,
} from './index';

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
      id,
      name,
      email,
      age,
      height: parseInteger(height_formatted, 'height'),
      weight: parseInteger(weight_formatted),
    };

    if (id) {
      const response = yield call(studentUpdate, student);

      toast.success('Estudante atualizado com sucesso');
      yield put(updateOrCreateStudentSuccess(response.data));
    } else {
      const response = yield call(studentCreate, student);

      toast.success('Estudante criado com sucesso');
      yield put(updateOrCreateStudentSuccess(response.data));
    }
    history.push('/students');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(updateOrCreateStudentFailure());
  }
}

export default all([
  takeLatest(Types.CREATE_OR_EDIT_STUDENT_REQUEST, updateStudent),
]);
