import { combineReducers } from 'redux';

import auth from './auth';
import user from './user/user';
import studentList from './student/list';
import studentUpdate from './student/update';
import studentDelete from './student/delete';
import planList from './plan/list';
import planUpdate from './plan/update';
import planDelete from './plan/delete';
import registrationList from './registration/list';
import registrationUpdate from './registration/update';
import registrationDelete from './registration/delete';
import supportList from './support/list';
import supportCreate from './support/create';

export default combineReducers({
  auth,
  user,
  studentList,
  studentUpdate,
  studentDelete,
  planList,
  planUpdate,
  planDelete,
  registrationList,
  registrationUpdate,
  registrationDelete,
  supportCreate,
  supportList,
});
