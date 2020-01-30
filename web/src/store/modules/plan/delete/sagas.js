import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { requestFailMessage } from '~/util/validation';

import * as planService from '~/services/plan';

import { Types, deletePlanSuccess, deletePlanFailure } from './index';
import { listPlanRequest } from '../list';

export function* deletePlan({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(planService.planDelete, id);

    toast.success('Plano removido com sucesso');

    yield put(deletePlanSuccess(response.data));

    yield put(listPlanRequest(1));
  } catch (err) {
    toast.error(requestFailMessage);
    yield put(deletePlanFailure());
  }
}

export default all([takeLatest(Types.REQUEST, deletePlan)]);
