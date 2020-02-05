import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { planDelete } from '~/services/plan';

import { Types, deletePlanSuccess, deletePlanFailure } from './index';
import { listPlanRequest } from '../list';

export function* deletePlan({ payload }) {
  const { id } = payload;

  try {
    const { data } = yield call(planDelete, id);

    toast.success('Plano removido com sucesso');

    yield put(deletePlanSuccess(data));
    yield put(listPlanRequest(1));
  } catch (err) {
    toast.error(err.data.error);
    yield put(deletePlanFailure());
  }
}

export default all([takeLatest(Types.DELETE_PLAN_REQUEST, deletePlan)]);
