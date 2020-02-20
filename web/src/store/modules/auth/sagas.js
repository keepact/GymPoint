import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';

import { authLogin } from '~/services/auth';

import { Types } from './index';

export function* signIn({ payload }) {
  try {
    const { data } = yield call(authLogin, payload);

    const { token, user } = data;

    localStorage.setItem('token', token);

    yield put({
      type: Types.SIGN_IN_SUCCESS,
      payload: { user },
    });
    history.push('/students');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.SIGN_FAILURE,
    });
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
