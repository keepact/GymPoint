import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import * as service from '~/services/helporder';
import NavigationService from '~/services/navigation';

import {
  Types,
  helpOrderSuccess,
  helpOrderFailure,
  helpOrderAnswer,
} from './index';

export function* createOrList({ payload }) {
  const { id, data } = payload;

  try {
    if (!data) {
      const response = yield call(service.helpOrderList, id);

      const helpOrderData = response.data;

      yield put(helpOrderSuccess(helpOrderData));
    } else {
      yield call(service.helpOrderCreate, payload);
      const response = yield call(service.helpOrderList, id);

      const helpOrderData = response.data;

      yield put(helpOrderSuccess(helpOrderData));

      NavigationService.navigate('HelpOrderList');
      Alert.alert('Sucesso', 'Pergunta Enviada');
    }
  } catch (err) {
    yield put(helpOrderFailure());
    Alert.alert('Falha na requisição', err.response.data.error);
  }
}

export function* redirect({ payload }) {
  if (payload.data !== undefined) {
    yield put(helpOrderAnswer(payload.data));
    NavigationService.navigate('HelpOrderAnswer');
  } else {
    NavigationService.navigate('HelpOrderAsk');
  }
}

export default all([
  takeLatest(Types.HELP_ORDERS_REQUEST, createOrList),
  takeLatest(Types.HELP_ORDERS_REDIRECT, redirect),
]);
