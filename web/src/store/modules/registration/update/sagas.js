import { takeLatest, call, put, all } from 'redux-saga/effects';
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

export function* requestNewOrEditRegistration({ payload }) {
  const { id } = payload;
  const { student, plan, start_date } = payload.data;

  const registrations = {
    id,
    student_id: student.id,
    plan_id: plan.id,
    start_date,
  };

  try {
    if (id) {
      const response = yield call(registrationUpdate, registrations);

      toast.success('Matrícula alterada com sucesso');
      yield put(updateOrCreateRegistrationSuccess(response.data));
    } else {
      const response = yield call(registrationCreate, registrations);

      toast.success('Matrícula criada com sucesso');
      yield put(updateOrCreateRegistrationSuccess(response.data));
    }
    history.push('/registrations');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(updateOrCreateRegistrationFailure());
  }
}

export default all([
  takeLatest(
    Types.CREATE_OR_EDIT_REGISTRATION_REQUEST,
    requestNewOrEditRegistration
  ),
]);
