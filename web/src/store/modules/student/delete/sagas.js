import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { studentDelete } from '~/services/student';

import { listStudentRequest } from '../list';

import { Types, deleteStudentSuccess, deleteStudentFailure } from './index';

export function* deleteStudent({ payload }) {
  const { id } = payload;

  try {
    const { data } = yield call(studentDelete, id);

    toast.success('Aluno removido com sucesso');

    yield put(deleteStudentSuccess(data));
    yield put(listStudentRequest(1));
  } catch (err) {
    toast.error(err.data.error);
    yield put(deleteStudentFailure());
  }
}

export default all([takeLatest(Types.DELETE_STUDENT_REQUEST, deleteStudent)]);
