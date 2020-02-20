import { takeLatest, call, put, all } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import { toast } from 'react-toastify';

import history from '~/services/history';
import * as planService from '~/services/plan';

import { Types } from './index';

export function* createOrEdiPlan({ payload }) {
  const { id } = payload;
  const { title, duration, price } = payload.data;

  const planData = {
    id,
    title,
    duration,
    price,
  };

  yield put(startSubmit('PLAN_FORM'));
  try {
    let response = {};

    if (id) {
      response = yield call(planService.planUpdate, planData);
    } else {
      response = yield call(planService.planCreate, planData);
    }

    const plan = response.data;

    toast.success(
      id ? 'Plano criado com sucesso' : 'Plano alterado com sucesso'
    );

    yield put(stopSubmit('PLAN_FORM'));

    yield put({
      type: Types.CREATE_OR_EDIT_PLAN_SUCCESS,
      payload: { plan },
    });
    history.push('/plans');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.CREATE_OR_EDIT_PLAN_FAILURE,
    });
  }
}

export default all([
  takeLatest(Types.CREATE_OR_EDIT_PLAN_REQUEST, createOrEdiPlan),
]);
