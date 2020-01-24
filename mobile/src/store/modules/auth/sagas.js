import { takeLatest, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { Types, signInSuccess, signFailure } from './index';
import { checkInRequest } from '../checkin';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    yield put(signInSuccess());
    yield put(checkInRequest(id));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique se seu ID está correto',
    );
    yield put(signFailure());
  }
}

export default all([takeLatest(Types.SIGN_IN_REQUEST, signIn)]);
