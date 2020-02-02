import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { removeDuplicates } from '~/util/functions';

import * as service from '~/services/helporder';
import NavigationService from '~/services/navigation';

import {
  Types,
  helpOrderRequest,
  helpOrderSuccess,
  helpOrderFailure,
  helpOrderAnswer,
} from './index';

export function* createQuestion({ payload }) {
  const { studentId } = yield select(state => state.auth);
  const { page } = yield select(state => state.helporder);

  const { data } = payload;
  const newHelpOrder = { data, studentId };

  try {
    yield call(service.helpOrderCreate, newHelpOrder);

    yield put(helpOrderRequest(page));

    NavigationService.navigate('HelpOrderList');
    Alert.alert('Sucesso', 'Pergunta Enviada');
  } catch (err) {
    Alert.alert(err.response.data.error);
    yield put(helpOrderFailure());
  }
}

export function* listQuestions({ payload }) {
  const { studentId } = yield select(state => state.auth);
  const { page } = payload;

  const helpOrder = { page, studentId };

  try {
    let response = {};

    if (page === 1) {
      response = yield call(service.helpOrderList, helpOrder);
    } else {
      response = yield call(service.helpOrderListNoPage, helpOrder);
    }

    const { rows: helpOrderData } = response.data.content;

    const pages = {
      currentPage: page,
      lastPage: response.data.lastPage,
    };

    const { helporders } = yield select(state => state.helporder);

    const newHelpOrders = [...helporders, ...helpOrderData];

    const currentQuestions = removeDuplicates(newHelpOrders, 'id');

    yield put(
      helpOrderSuccess(page !== 1 ? currentQuestions : helpOrderData, pages),
    );
  } catch (err) {
    yield put(helpOrderFailure());
    Alert.alert('Falha na requisição', err.response.data.error);
  }
}

export function* helpOrderRedirect({ payload }) {
  if (payload.data) {
    yield put(helpOrderAnswer(payload.data));
    NavigationService.navigate('HelpOrderAnswer');
  } else {
    NavigationService.navigate('HelpOrderAsk');
  }
}

export default all([
  takeLatest(Types.CREATE_HELP_ORDERS_REQUEST, createQuestion),
  takeLatest(Types.HELP_ORDERS_REQUEST, listQuestions),
  takeLatest(Types.HELP_ORDERS_REDIRECT, helpOrderRedirect),
]);
