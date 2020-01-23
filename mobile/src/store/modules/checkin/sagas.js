import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { Types, checkInRequest, checkInFailure } from './index';

export function* checkIn({ payload }) {
  try {
    const response = yield call(api.get, `/students/${id}/checkins`);

    const checkIns = response.data;

    yield put(checkInRequest(checkIns));
  } catch (err) {
    Alert.alert(
      'Falha na requisição',
      'Houve um erro na hora da listagem, tente novamente em alguns minutos',
    );
    yield put(checkInFailure());
  }
}

export default all([takeLatest(Types.CHECKIN_REQUEST, checkIn)]);
