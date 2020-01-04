import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Types, deletePlanSuccess, deletePlanFailure } from './index';
import { listPlanRequest } from '../list';

export function* deletePlan({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `plans/${id}`);

    toast.success('Plano removido com sucesso');

    yield put(deletePlanSuccess(response.data));

    if (response.status === 200) {
      yield put(listPlanRequest(1));
    }
  } catch (err) {
    toast.error('Houve erro, tente novamente em alguns minutos');
    yield put(deletePlanFailure());
  }
}

export default all([takeLatest(Types.REQUEST, deletePlan)]);
