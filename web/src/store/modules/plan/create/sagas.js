import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { Types, createPlanSuccess, createPlanFailure } from './plan';

export function* createPlan({ payload }) {
  try {
    const { title, duration, price } = payload.data;

    const plan = {
      title,
      duration,
      price,
    };
    const response = yield call(api.post, 'plans', plan);

    toast.success('Plano criado com sucesso');

    yield put(createPlanSuccess(response.data));
    history.push('/plans');
  } catch (err) {
    toast.error('Error ao criar o plano, confira os dados');
    yield put(createPlanFailure());
  }
}

export default all([takeLatest(Types.REQUEST, createPlan)]);
