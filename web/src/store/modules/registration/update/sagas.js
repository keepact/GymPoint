import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  Types,
  updateOrCreateRegistrationSuccess,
  updateOrCreateRegistrationFailure,
} from './index';

export function* requestNewOrEditRegistration({ payload }) {
  try {
    const { id } = payload;
    const { student, plan, start_date } = payload.data;

    const registrations = {
      student_id: student.id,
      plan_id: plan.id,
      start_date,
    };

    if (id !== undefined) {
      const response = yield call(
        api.put,
        `registrations/${id}`,
        registrations
      );

      toast.success('Matrícula alterada com sucesso');
      yield put(updateOrCreateRegistrationSuccess(response.data));
    } else {
      const response = yield call(api.post, 'registrations', registrations);

      toast.success('Matrícula criada com sucesso');
      yield put(updateOrCreateRegistrationSuccess(response.data));
    }
    history.push('/registrations');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(updateOrCreateRegistrationFailure());
  }
}

export default all([takeLatest(Types.REQUEST, requestNewOrEditRegistration)]);
