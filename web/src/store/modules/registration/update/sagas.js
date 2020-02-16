import { takeLatest, call, put, all } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';

import { toast } from 'react-toastify';

import history from '~/services/history';
import {
  registrationUpdate,
  registrationCreate,
} from '~/services/registration';

import {
  Types,
  updateOrCreateRegistrationSuccess,
  updateOrCreateRegistrationFailure,
} from './index';

export function* createOrEditRegistration({ payload }) {
  const { id } = payload;
  const { student, plan, start_date } = payload.data;

  const registrations = {
    id,
    student_id: student.id,
    plan_id: plan.id,
    start_date,
  };

  yield put(startSubmit('REGISTRATION_FORM_EDIT'));
  try {
    let response = {};

    if (id) {
      response = yield call(registrationUpdate, registrations);
    } else {
      response = yield call(registrationCreate, registrations);
    }

    toast.success(
      id ? 'Matrícula alterada com sucesso' : 'Matrícula criada com sucesso'
    );

    yield put(stopSubmit('REGISTRATION_FORM_EDIT'));
    yield put(updateOrCreateRegistrationSuccess(response.data));
    history.push('/registrations');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(updateOrCreateRegistrationFailure());
  }
}

export default all([
  takeLatest(
    Types.CREATE_OR_EDIT_REGISTRATION_REQUEST,
    createOrEditRegistration
  ),
]);
