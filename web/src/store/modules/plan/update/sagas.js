import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { Types, updatePlanSuccess, updatePlanFailure } from './plan';

export function* updatePlan({ payload }) {
  try {
    const { id } = payload;

    const { title, duration, price } = payload.data;

    const plan = {
      title,
      duration,
      price,
    };
    const response = yield call(api.put, `/plans/${id}`, plan);

    toast.success('Plano alterado com sucesso');

    yield put(updatePlanSuccess(response.data));
    history.push('/plans');
  } catch (err) {
    toast.error('Error ao alterar o plano, confira os dados');
    yield put(updatePlanFailure());
  }
}

export default all([takeLatest(Types.REQUEST, updatePlan)]);
