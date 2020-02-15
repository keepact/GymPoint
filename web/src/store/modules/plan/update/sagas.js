import { takeLatest, call, put, all } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import { toast } from 'react-toastify';

import history from '~/services/history';
import * as planService from '~/services/plan';

import {
  Types,
  updateOrCreatePlanSuccess,
  updateOrCreatePlanFailure,
} from './index';

export function* createOrEdiPlan({ payload }) {
  const { id } = payload;
  const { title, duration, price } = payload.data;

  const plan = {
    id,
    title,
    duration,
    price,
  };

  yield put(startSubmit('PLAN_FORM_EDIT'));
  try {
    let response = {};

    if (id) {
      response = yield call(planService.planUpdate, plan);
    } else {
      response = yield call(planService.planCreate, plan);
    }

    toast.success(
      id ? 'Plano criado com sucesso' : 'Plano alterado com sucesso'
    );

    yield put(stopSubmit('PLAN_FORM_EDIT'));
    yield put(updateOrCreatePlanSuccess(response.data));
    history.push('/plans');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(updateOrCreatePlanFailure());
  }
}

export default all([
  takeLatest(Types.CREATE_OR_EDIT_PLAN_REQUEST, createOrEdiPlan),
]);
