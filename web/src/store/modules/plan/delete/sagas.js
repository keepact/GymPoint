import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { planDelete } from '~/services/plan';

import { Types } from './index';
import { getAllPlans } from '../list';

export function* deletePlan({ payload }) {
  const { id } = payload;

  try {
    yield call(planDelete, id);

    toast.success('Plano removido com sucesso');

    yield put({
      type: Types.DELETE_PLAN_SUCCESS,
    });

    yield put(getAllPlans(1));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.DELETE_PLAN_FAILURE,
    });
  }
}

export default all([takeLatest(Types.DELETE_PLAN_REQUEST, deletePlan)]);
