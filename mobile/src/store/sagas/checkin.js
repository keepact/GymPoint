import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { Alert } from 'react-native';

import * as service from '~/services/checkin';

import { removeDuplicates } from '~/util/functions';

import { Types } from '../ducks/checkin';

export function* createCheckIn() {
  const { studentId } = yield select(state => state.auth);
  try {
    const { data } = yield call(service.checkinCreate, studentId);

    yield put({
      type: Types.CREATE_CHECKIN_SUCCESS,
      payload: { data },
    });
  } catch (err) {
    Alert.alert(err.response.data.error);
    yield put({
      type: Types.CHECKIN_FAILURE,
    });
  }
}

export function* listCheckIns({ payload }) {
  const { page } = payload;
  const { studentId } = yield select(state => state.auth);
  const checkin = { studentId, page };

  try {
    const { data } = yield call(service.checkinList, checkin);

    const pages = {
      currentPage: page,
      lastPage: data.lastPage,
      total: data.content.count,
    };

    const { rows: checkInData } = data.content;

    const { checkIns } = yield select(state => state.checkin);

    const newCheckins = [...checkIns, ...checkInData];
    const currentCheckins = removeDuplicates(newCheckins, 'id');

    yield put({
      type: Types.CHECKIN_SUCCESS,
      payload:
        page !== 1
          ? { checkIns: currentCheckins, pages }
          : { checkIns: checkInData, pages },
    });
  } catch (err) {
    Alert.alert('Houve um erro', err.response.data.error);
    yield put({
      type: Types.CHECKIN_FAILURE,
    });
  }
}

export default all([
  takeLatest(Types.CHECKIN_REQUEST, listCheckIns),
  takeLatest(Types.CREATE_CHECKIN_REQUEST, createCheckIn),
]);
