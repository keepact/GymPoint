import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { Alert } from 'react-native';

import * as service from '~/services/checkin';

import { removeDuplicates } from '~/util/functions';

import { Types, checkInSuccess, checkInFailure, checkInRequest } from './index';

export function* createCheckIn({ payload }) {
  const { page } = payload;
  const { studentId } = yield select(state => state.auth);

  try {
    yield call(service.checkinCreate, studentId);

    yield put(checkInRequest(page));
  } catch (err) {
    Alert.alert(err.response.data.error);
    yield put(checkInFailure());
  }
}

export function* listCheckIn({ payload }) {
  const { page } = payload;
  const { studentId } = yield select(state => state.auth);
  const checkin = { studentId, page };

  try {
    let response = {};

    if (page === 1) {
      response = yield call(service.checkinList, checkin);
    } else {
      response = yield call(service.checkinListNoPage, checkin);
    }

    const pages = {
      currentPage: page,
      lastPage: response.data.lastPage,
    };

    const { rows: checkInData } = response.data.content;

    const { checkIns } = yield select(state => state.checkin);

    const newCheckins = [...checkIns, ...checkInData];
    const currentCheckins = removeDuplicates(newCheckins, 'id');

    yield put(
      checkInSuccess(page !== 1 ? currentCheckins : checkInData, pages),
    );
  } catch (err) {
    Alert.alert('Falha na requisição', err.response.data.error);
    yield put(checkInFailure());
  }
}

export default all([
  takeLatest(Types.CHECKIN_REQUEST, listCheckIn),
  takeLatest(Types.CREATE_CHECKIN_REQUEST, createCheckIn),
]);
