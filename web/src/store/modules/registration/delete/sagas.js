import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { listRegistrationRequest } from '../list';

import {
  Types,
  deleteRegistrationSuccess,
  deleteRegistrationFailure,
} from './index';

export function* deleteRegistration({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `registrations/${id}`);

    toast.success('Matrícula removida com sucesso');

    yield put(deleteRegistrationSuccess(response.data));

    if (response.status === 200) {
      yield put(listRegistrationRequest(1));
    }
  } catch (err) {
    toast.error('Houve um erro, tente novamente em alguns minutos');
    yield put(deleteRegistrationFailure());
  }
}

export default all([takeLatest(Types.REQUEST, deleteRegistration)]);
