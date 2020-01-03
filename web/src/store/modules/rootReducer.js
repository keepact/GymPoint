import { combineReducers } from 'redux';

import auth from './auth';
import user from './user/user';
import studentList from './student/list/student';
import studentCreate from './student/create/student';
import studentUpdate from './student/update/student';
import studentDelete from './student/delete/student';
import planList from './plan/list/plan';
import planCreate from './plan/create/plan';
import planUpdate from './plan/update/plan';
import planDelete from './plan/delete/plan';
import registrationList from './registration/list/registration';
import registrationCreate from './registration/create/registration';
import registrationUpdate from './registration/update/registration';
import registrationDelete from './registration/delete/registration';
import supportList from './support/list/support';
import supportCreate from './support/create/support';

export default combineReducers({
  auth,
  user,
  studentList,
  studentCreate,
  studentUpdate,
  studentDelete,
  planCreate,
  planList,
  planUpdate,
  planDelete,
  registrationList,
  registrationCreate,
  registrationUpdate,
  registrationDelete,
  supportCreate,
  supportList,
});
