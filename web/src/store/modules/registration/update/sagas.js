import { takeLatest, call, put, all } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';

import { toast } from 'react-toastify';

import history from '~/services/history';
import {
  registrationUpdate,
  registrationCreate,
} from '~/services/registration';

import { Types } from './index';

export function* createOrEditRegistration({ payload }) {
  const { id } = payload;
  const { student, plan, start_date } = payload.data;

  const registrations = {
    id,
    student_id: student.id,
    plan_id: plan.id,
    start_date,
  };

  yield put(startSubmit('REGISTRATION_FORM'));
  try {
    let response = {};

    if (id) {
      response = yield call(registrationUpdate, registrations);
    } else {
      response = yield call(registrationCreate, registrations);
    }

    const registration = response.data;

    toast.success(
      id ? 'Matrícula alterada com sucesso' : 'Matrícula criada com sucesso'
    );

    yield put(stopSubmit('REGISTRATION_FORM'));

    yield put({
      type: Types.CREATE_OR_EDIT_REGISTRATION_SUCCESS,
      payload: { registration },
    });
    history.push('/registrations');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.CREATE_OR_EDIT_REGISTRATION_FAILURE,
    });
  }
}

export default all([
  takeLatest(
    Types.CREATE_OR_EDIT_REGISTRATION_REQUEST,
    createOrEditRegistration
  ),
]);
