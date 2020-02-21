import { all } from 'redux-saga/effects';

import auth from './sagas/auth';
import user from './sagas/user';
import student from './sagas/student';
import plan from './sagas/plan';
import registration from './sagas/registration';
import helporder from './sagas/helporder';

export default function* rootSaga() {
  return yield all([auth, user, student, plan, registration, helporder]);
}
