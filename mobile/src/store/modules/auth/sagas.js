import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { Types, signInSuccess, signFailure } from './index';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/students/${id}/checkins`);

    const student = response.data;

    yield put(signInSuccess(student));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique se seu ID está correto',
    );
    yield put(signFailure());
  }
}

export default all([takeLatest(Types.SIGN_IN_REQUEST, signIn)]);
