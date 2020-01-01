import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Types, deletePlanSuccess, deletePlanFailure } from './plan';

export function* deletePlan({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `plans/${id}`);

    toast.success('Plano removido com sucesso');

    yield put(deletePlanSuccess(response.data));
  } catch (err) {
    toast.error('Error ao deletar o plano, talves vocês não tenha permissão');
    yield put(deletePlanFailure());
  }
}

export default all([takeLatest(Types.REQUEST, deletePlan)]);
