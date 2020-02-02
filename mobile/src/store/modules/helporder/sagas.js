import { takeLatest, call, put, all, select } from 'redux-saga/effects';
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
  const { data } = payload;
  const { studentId } = yield select(state => state.auth);
  const { page } = yield select(state => state.helporder);

  const helpOrder = { page, studentId };

  try {
    if (!data) {
      const response = yield call(service.helpOrderList, helpOrder);

      const { rows: helpOrderData } = response.data.content;

      const pages = {
        currentPage: page,
        lastPage: response.data.lastPage,
      };

      yield put(helpOrderSuccess(helpOrderData, pages));
    } else {
      const newHelpOrder = { data, studentId };

      yield call(service.helpOrderCreate, newHelpOrder);

      const response = yield call(service.helpOrderList, helpOrder);

      const { rows: helpOrderData } = response.data.content;

      const pages = {
        currentPage: page,
        lastPage: response.data.lastPage,
      };

      yield put(helpOrderSuccess(helpOrderData, pages));

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
