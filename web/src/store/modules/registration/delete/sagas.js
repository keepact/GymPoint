import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  Types,
  deleteRegistrationSuccess,
  deleteRegistrationFailure,
} from './registration';

export function* deleteStudent({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `registrations/${id}`);

    toast.success('Matrícula removida com sucesso');

    yield put(deleteRegistrationSuccess(response.data));
  } catch (err) {
    toast.error(
      'Error ao deletar a matrícula, talves vocês não tenha permissão'
    );
    yield put(deleteRegistrationFailure());
  }
}

export default all([takeLatest(Types.REQUEST, deleteStudent)]);
