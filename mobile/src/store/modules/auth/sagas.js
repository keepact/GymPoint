import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { Types, signInSuccess, signFailure } from './index';
import { checkInSuccess } from '../checkin';

import * as service from '~/services/checkin';

export function* signIn({ payload }) {
  const { id } = payload;
  const { page } = yield select(state => state.checkin);

  try {
    const checkin = { page, id };
    const response = yield call(service.checkinList, checkin);

    const { rows: checkinData } = response.data.content;

    const pages = {
      currentPage: page,
      lastPage: response.data.lastPage,
    };

    yield put(checkInSuccess(checkinData, pages));

    yield put(signInSuccess(id));
  } catch (err) {
    Alert.alert('Falha na autenticação', err.response.data.error);
    yield put(signFailure());
  }
}

export default all([takeLatest(Types.SIGN_IN_REQUEST, signIn)]);
