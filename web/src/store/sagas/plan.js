import { takeLatest, call, put, all } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';

import { toast } from 'react-toastify';

import { formatPrice } from '~/util/format';
import history from '~/services/history';
import * as planService from '~/services/plan';

import { Types, getAllPlans } from '../ducks/plan';

export function* listPlanId({ payload }) {
  const { id } = payload;

  try {
    const { data } = yield call(planService.planListId, id);

    const { title, duration, price } = data;

    const total = price * duration;
    const plan = {
      id,
      title,
      duration,
      price,
      total,
    };

    yield put({
      type: Types.LIST_PLAN_ID_SUCCESS,
      payload: { plan },
    });
    history.push('/plans/edit');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.PLAN_LOADED,
    });
  }
}

export function* listPlans({ payload }) {
  const { page, newList } = payload;

  try {
    const { data } = yield call(planService.planList, page);

    const plans = data.content.rows.map(plan => ({
      id: plan.id,
      duration: plan.duration,
      title: plan.title,
      labelTitle: `${plan.duration} ${plan.duration >= 2 ? 'meses' : 'mês'}`,
      price: newList === 'registration' ? plan.price : formatPrice(plan.price),
    }));

    const { lastPage } = data;

    const pages = {
      currentPage: page,
      lastPage,
    };

    yield put({
      type: Types.LIST_PLANS_SUCCESS,
      payload: { plans, pages },
    });
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.PLAN_LOADED,
    });
  }
}

export function planInitialState() {
  history.push('plans/create');
}

export function planRedirect() {
  history.push('/plans');
}

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
    if (id) {
      yield call(planService.planUpdate, planData);
    } else {
      yield call(planService.planCreate, planData);
    }

    toast.success(
      id ? 'Plano criado com sucesso' : 'Plano alterado com sucesso'
    );

    yield put(stopSubmit('PLAN_FORM'));

    yield put({
      type: Types.PLAN_LOADED,
    });
    history.push('/plans');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.PLAN_LOADED,
    });
  }
}

export function* deletePlan({ payload }) {
  const { id } = payload;

  try {
    yield call(planService.planDelete, id);

    toast.success('Plano removido com sucesso');

    yield put({
      type: Types.PLAN_LOADED,
    });

    yield put(getAllPlans(1));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.PLAN_LOADED,
    });
  }
}

export default all([
  takeLatest(Types.LIST_PLANS_REQUEST, listPlans),
  takeLatest(Types.LIST_PLAN_ID_REQUEST, listPlanId),
  takeLatest(Types.UPDATE_PLAN_INITIAL_STATE, planInitialState),
  takeLatest(Types.PLAN_REDIRECT, planRedirect),
  takeLatest(Types.CREATE_OR_EDIT_PLAN_REQUEST, createOrEdiPlan),
  takeLatest(Types.DELETE_PLAN_REQUEST, deletePlan),
]);
