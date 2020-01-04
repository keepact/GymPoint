import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import studentList from './student/list/sagas';
import studentUpdate from './student/update/sagas';
import studentDelete from './student/delete/sagas';
import planList from './plan/list/sagas';
import planUpdate from './plan/update/sagas';
import planDelete from './plan/delete/sagas';
import registrationList from './registration/list/sagas';
import registrationUpdate from './registration/update/sagas';
import registrationDelete from './registration/delete/sagas';
import supportCreate from './support/create/sagas';
import supportList from './support/list/sagas';

export default function* rootSaga() {
  return yield all([
    auth,
    user,
    studentUpdate,
    studentList,
    studentDelete,
    planList,
    planUpdate,
    planDelete,
    registrationList,
    registrationUpdate,
    registrationDelete,
    supportCreate,
    supportList,
  ]);
}
