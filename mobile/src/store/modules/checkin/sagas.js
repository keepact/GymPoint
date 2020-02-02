import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { Alert } from 'react-native';

import * as service from '~/services/checkin';

import { Types, checkInSuccess, checkInFailure } from './index';

export function* createOrListCheckIn({ payload }) {
  const { page, refresh } = payload;
  const { studentId } = yield select(state => state.auth);

  try {
    const checkin = { studentId, page };

    if (!refresh) {
      yield call(service.checkinCreate, studentId);
    }

    let response = {};

    if (!page) {
      response = yield call(service.checkinListNoPage, checkin);
    } else {
      response = yield call(service.checkinList, checkin);
    }

    const { rows: checkInData } = response.data.content;

    const pages = {
      currentPage: page,
      lastPage: response.data.lastPage,
    };

    if (page === 1) {
      yield put(checkInSuccess(checkInData, pages));
    } else {
      const { checkIns } = yield select(state => state.checkin);

      const newCheckins = [...checkIns, ...checkInData];

      const removeDuplicates = (list, attribute) => {
        return list.filter(
          (item, pos) =>
            list.map(element => element[attribute]).indexOf(item[attribute]) ===
            pos,
        );
      };

      const currentCheckins = removeDuplicates(newCheckins, 'id');

      yield put(checkInSuccess(currentCheckins, pages));
    }
  } catch (err) {
    Alert.alert('Falha na requisição', err.response.data.error);
    yield put(checkInFailure());
  }
}

export default all([takeLatest(Types.CHECKIN_REQUEST, createOrListCheckIn)]);
