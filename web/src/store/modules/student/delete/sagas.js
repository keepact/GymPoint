import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { studentDelete } from '~/services/student';

import { getAllStudents } from '../list';

import { Types } from './index';

export function* deleteStudent({ payload }) {
  const { id } = payload;

  try {
    yield call(studentDelete, id);

    toast.success('Aluno removido com sucesso');

    yield put({
      type: Types.DELETE_STUDENT_SUCCESS,
    });
    yield put(getAllStudents(1));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.DELETE_STUDENT_FAILURE,
    });
  }
}

export default all([takeLatest(Types.DELETE_STUDENT_REQUEST, deleteStudent)]);
