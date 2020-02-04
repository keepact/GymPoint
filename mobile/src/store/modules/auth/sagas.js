import { takeLatest, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { Types, signInSuccess, signFailure } from './index';
import { checkInRequest } from '../checkin';

export function* signIn({ payload }) {
  const { id } = payload;

  try {
    yield put(signInSuccess(id));
    yield put(checkInRequest(1));
  } catch (err) {
    Alert.alert('Falha na autenticação', 'Verifique se seu ID está correto');
    yield put(signFailure());
  }
}

export default all([takeLatest(Types.SIGN_IN_REQUEST, signIn)]);
