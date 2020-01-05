import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  Types,
  updateOrCreatePlanSuccess,
  updateOrCreatePlanFailure,
} from './index';

export function* requestNewOrEdiPlan({ payload }) {
  try {
    const { id } = payload;

    const { title, duration, price } = payload.data;

    const plan = {
      title,
      duration,
      price,
    };

    if (id !== undefined) {
      const response = yield call(api.put, `/plans/${id}`, plan);

      toast.success('Plano alterado com sucesso');
      yield put(updateOrCreatePlanSuccess(response.data));
    } else {
      const response = yield call(api.post, 'plans', plan);

      toast.success('Plano criado com sucesso');
      yield put(updateOrCreatePlanSuccess(response.data));
    }
    history.push('/plans');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(updateOrCreatePlanFailure());
  }
}

export default all([takeLatest(Types.REQUEST, requestNewOrEdiPlan)]);
