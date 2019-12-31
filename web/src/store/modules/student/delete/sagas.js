import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Types, deleteStudentSuccess, deleteStudentFailure } from './student';

export function* deleteStudent({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `students/${id}`);

    toast.success('Aluno removido com sucesso');

    yield put(deleteStudentSuccess(response.data));
  } catch (err) {
    toast.error(
      'Error ao deletar o estudante, talves vocês não tenha permissão'
    );
    yield put(deleteStudentFailure());
  }
}

export default all([takeLatest(Types.REQUEST, deleteStudent)]);
