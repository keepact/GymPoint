import { combineReducers } from 'redux';

import auth from './auth';
import user from './user/user';
import studentList from './student/list/student';
import studentCreate from './student/create/student';
import studentUpdate from './student/update/student';
import planCreate from './plan/create/plan';
import planUpdate from './plan/update/plan';
import registrationCreate from './registration/create/registration';
import registrationUpdate from './registration/update/registration';
import supportCreate from './support/create/support';
import supportList from './support/list/support';

export default combineReducers({
  auth,
  user,
  studentList,
  studentCreate,
  studentUpdate,
  planCreate,
  planUpdate,
  registrationCreate,
  registrationUpdate,
  supportCreate,
  supportList,
});
