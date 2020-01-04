import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { requestFailMessage } from '~/util/validation';

import { formatPrice } from '~/util/format';
import history from '~/services/history';
import api from '~/services/api';

import {
  Types,
  listPlanSuccess,
  listPlanSuccessId,
  listPlanFailure,
} from './plan';

export function* listPlanId({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, 'plans', {
      params: { id },
    });
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
    if (newList === 'delete') {
      yield delay(600);
    }
    const response = yield call(api.get, 'plans', {
      params: { page },
    });

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
  history.push('/plans/create');
}

export default all([
  takeLatest(Types.REQUEST, listPlans),
  takeLatest(Types.REQUEST_ID, listPlanId),
  takeLatest(Types.REQUEST_INITIAL_STATE, planInitialState),
]);
