import { takeLatest, call, put, all } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';

import { toast } from 'react-toastify';
import { parseInteger } from '~/util/format';

import history from '~/services/history';
import { studentCreate, studentUpdate } from '~/services/student';

import { Types } from './index';

export function* updateStudent({ payload }) {
  const { name, email, age, height_formatted, weight_formatted } = payload.data;

  const { id } = payload;

  const studentData = {
    id,
    name,
    email,
    age,
    height: parseInteger(height_formatted, 'height'),
    weight: parseInteger(weight_formatted),
  };

  yield put(startSubmit('STUDENT_FORM'));
  try {
    let response = {};

    if (id) {
      response = yield call(studentUpdate, studentData);
    } else {
      response = yield call(studentCreate, studentData);
    }

    const student = response.data;

    toast.success(
      id ? 'Estudante atualizado com sucesso' : 'Estudante criado com sucesso'
    );

    yield put(stopSubmit('STUDENT_FORM'));
    yield put({
      type: Types.CREATE_OR_EDIT_STUDENT_SUCCESS,
      payload: { student },
    });
    history.push('/students');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.CREATE_OR_EDIT_STUDENT_FAILURE,
    });
  }
}

export default all([
  takeLatest(Types.CREATE_OR_EDIT_STUDENT_REQUEST, updateStudent),
]);
