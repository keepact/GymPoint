import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { Types, signInSuccess, signFailure } from './index';
import { checkInSuccess } from '../checkin';

import * as service from '~/services/checkin';

export function* signIn({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(service.checkinList, id);

    yield put(checkInSuccess(response.data));

    yield put(signInSuccess(id));
  } catch (err) {
    Alert.alert('Falha na autenticação', err.response.data.error);
    yield put(signFailure());
  }
}

export default all([takeLatest(Types.SIGN_IN_REQUEST, signIn)]);
