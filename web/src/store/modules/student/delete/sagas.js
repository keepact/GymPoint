import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { listStudentRequest } from '../list';
import { requestFailMessage } from '~/util/validation';

import { Types, deleteStudentSuccess, deleteStudentFailure } from './index';

export function* deleteStudent({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `students/${id}`);

    toast.success('Aluno removido com sucesso');

    yield put(deleteStudentSuccess(response.data));

    if (response.status === 200) {
      yield put(listStudentRequest(1));
    }
  } catch (err) {
    toast.error(requestFailMessage);
    yield put(deleteStudentFailure());
  }
}

export default all([takeLatest(Types.REQUEST, deleteStudent)]);
