import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { Alert } from 'react-native';

import * as service from '~/services/checkin';

import { Types, checkInSuccess, checkInFailure } from './index';

export function* createCheckIn({ payload }) {
  const { page } = payload;
  const { studentId } = yield select(state => state.auth);

  try {
    const checkin = { studentId, page };

    yield call(service.checkinCreate, studentId);
    const response = yield call(service.checkinList, checkin);

    const { rows: checkInData } = response.data.content;

    const pages = {
      currentPage: page,
      lastPage: response.data.lastPage,
    };

    yield put(checkInSuccess(checkInData, pages));
  } catch (err) {
    Alert.alert('Falha na requisição', err.response.data.error);
    yield put(checkInFailure());
  }
}

export default all([takeLatest(Types.CHECKIN_REQUEST, createCheckIn)]);
