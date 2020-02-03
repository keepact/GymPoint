import { takeLatest, put, all, select } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { Types, signInSuccess, signFailure } from './index';
import { checkInRequest } from '../checkin';

export function* signIn({ payload }) {
  const { id } = payload;
  const { page } = yield select(state => state.checkin);

  try {
    yield put(signInSuccess(id));
    yield put(checkInRequest(page));
  } catch (err) {
    Alert.alert('Falha na autenticação', err.response.data.error);
    yield put(signFailure());
  }
}

export default all([takeLatest(Types.SIGN_IN_REQUEST, signIn)]);
