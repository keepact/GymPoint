import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { registrationDelete } from '~/services/registration';
import { getAllRegistrations } from '../list';

import { Types } from './index';

export function* deleteRegistration({ payload }) {
  const { id } = payload;

  try {
    yield call(registrationDelete, id);

    toast.success('Matrícula removida com sucesso');

    yield put({
      type: Types.DELETE_REGISTRATION_SUCCESS,
    });

    yield put(getAllRegistrations(1));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.DELETE_REGISTRATION_FAILURE,
    });
  }
}

export default all([
  takeLatest(Types.DELETE_REGISTRATION_REQUEST, deleteRegistration),
]);
