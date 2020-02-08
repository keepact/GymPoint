import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { registrationDelete } from '~/services/registration';
import { listRegistrationRequest } from '../list';

import {
  Types,
  deleteRegistrationSuccess,
  deleteRegistrationFailure,
} from './index';

export function* deleteRegistration({ payload }) {
  const { id } = payload;

  try {
    const { data } = yield call(registrationDelete, id);

    toast.success('Matrícula removida com sucesso');

    yield put(deleteRegistrationSuccess(data));
    yield put(listRegistrationRequest(1));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(deleteRegistrationFailure());
  }
}

export default all([
  takeLatest(Types.DELETE_REGISTRATION_REQUEST, deleteRegistration),
]);
