import { takeLatest, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { Types } from '../ducks/auth';
import { listCheckIn } from '../ducks/checkin';

export function* signIn({ payload }) {
  const { id } = payload;

  try {
    yield put({
      type: Types.SIGN_IN_SUCCESS,
      payload: { id },
    });
    yield put(listCheckIn(1));
  } catch (err) {
    Alert.alert('Houve um erro', err.response.data.error);
    yield put({
      type: Types.SIGN_IN_FAILURE,
    });
  }
}

export default all([takeLatest(Types.SIGN_IN_REQUEST, signIn)]);
