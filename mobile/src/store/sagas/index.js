import { all } from 'redux-saga/effects';

import auth from './auth';
import checkin from './checkin';
import helporder from './helporder';

export default function* rootSaga() {
  return yield all([auth, checkin, helporder]);
}
