import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  Types,
  createRegistrationSuccess,
  createRegistrationFailure,
} from './registration';

export function* createRegistration({ payload }) {
  try {
    const { student, plan, start_date } = payload.data;

    const registrations = {
      student_id: student.id,
      plan_id: plan.id,
      start_date,
    };

    const response = yield call(api.post, 'registrations', registrations);

    toast.success('Matrícula criado com sucesso');

    yield put(createRegistrationSuccess(response.data));
    history.push('/registrations');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(createRegistrationFailure());
  }
}

export default all([takeLatest(Types.REQUEST, createRegistration)]);
