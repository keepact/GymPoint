import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { requestFailMessage } from '~/util/validation';

import { formatPrice } from '~/util/format';
import history from '~/services/history';
import * as planService from '~/services/plan';

import {
  Types,
  listPlanSuccess,
  listPlanSuccessId,
  listPlanFailure,
} from './index';

export function* listPlanId({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(planService.planListId, id);
    const { title, duration, price } = response.data;

    const plan = {
      id,
      title,
      duration,
      price,
      finalPrice: price * duration,
    };

    yield put(listPlanSuccessId(plan));
    history.push('/plans/edit');
  } catch (err) {
    toast.error(requestFailMessage);
    yield put(listPlanFailure());
  }
}

export function* listPlans({ payload }) {
  const { page, newList } = payload;

  try {
    const response = yield call(planService.planList, page);

    const plans = response.data.content.map(plan => ({
      id: plan.id,
      duration: plan.duration,
      title: plan.title,
      labelTitle: `${plan.duration} ${plan.duration >= 2 ? 'meses' : 'mês'}`,
      price: newList === 'registration' ? plan.price : formatPrice(plan.price),
    }));

    const { lastPage } = response.data;

    const pages = {
      currentPage: page,
      lastPage,
    };

    yield put(listPlanSuccess(plans, pages));
  } catch (err) {
    toast.error(requestFailMessage);
    yield put(listPlanFailure());
  }
}

export function planInitialState() {
  history.push('plans/create');
}

export function planRedirect() {
  history.push('/plans');
}

export default all([
  takeLatest(Types.LIST_PLANS_REQUEST, listPlans),
  takeLatest(Types.LIST_PLAN_ID_REQUEST, listPlanId),
  takeLatest(Types.UPDATE_PLAN_INITIAL_STATE, planInitialState),
  takeLatest(Types.PLAN_REDIRECT, planRedirect),
]);
