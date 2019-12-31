import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  Types,
  updateRegistrationSuccess,
  updateRegistrationFailure,
} from './registration';

export function* updateRegistration({ payload }) {
  try {
    const { id } = payload;
    const { student, plan, start_date } = payload.data;

    const registrations = {
      student_id: student.id,
      plan_id: plan.id,
      start_date,
    };

    const response = yield call(api.put, `registrations/${id}`, registrations);

    toast.success('Matrícula alterada com sucesso');

    yield put(updateRegistrationSuccess(response.data));
    history.push('/registratios');
  } catch (err) {
    toast.error('Error ao atualizar a matrícula, confira os dados');
    yield put(updateRegistrationFailure());
  }
}

export default all([takeLatest(Types.REQUEST, updateRegistration)]);
