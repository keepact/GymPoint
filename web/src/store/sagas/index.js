import { all } from 'redux-saga/effects';

import auth from './auth';
import user from './user';
import student from './student';
import plan from './plan';
import registration from './registration';
import helporder from './helporder';

export default function* rootSaga() {
  return yield all([auth, user, student, plan, registration, helporder]);
}
