import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { studentDelete } from '~/services/student';

import { listStudentRequest } from '../list';
import { requestFailMessage } from '~/util/validation';

import { Types, deleteStudentSuccess, deleteStudentFailure } from './index';

export function* deleteStudent({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(studentDelete, id);

    toast.success('Aluno removido com sucesso');

    yield put(deleteStudentSuccess(response.data));
    yield put(listStudentRequest(1));
  } catch (err) {
    toast.error(requestFailMessage);
    yield put(deleteStudentFailure());
  }
}

export default all([takeLatest(Types.REQUEST, deleteStudent)]);
