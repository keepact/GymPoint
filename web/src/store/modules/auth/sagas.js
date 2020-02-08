import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';

import { authLogin } from '~/services/auth';

import { Types, signInSuccess, signFailure } from './index';

export function* signIn({ payload }) {
  try {
    const { data } = yield call(authLogin, payload);

    const { token, user } = data;

    localStorage.setItem('token', token);

    yield put(signInSuccess(user));

    history.push('/students');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

export function signOut() {
  history.push('/');
  localStorage.removeItem('token');
}

export default all([
  takeLatest(Types.SIGN_IN_REQUEST, signIn),
  takeLatest(Types.SIGN_OUT, signOut),
]);
