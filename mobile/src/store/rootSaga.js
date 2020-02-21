import { all } from 'redux-saga/effects';

import auth from './sagas/auth';
import checkin from './sagas/checkin';
import helporder from './sagas/helporder';

export default function* rootSaga() {
  return yield all([auth, checkin, helporder]);
}
