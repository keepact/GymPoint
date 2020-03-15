import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import user from './user';
import student from './student';
import plan from './plan';
import registration from './registration';
import helporder from './helporder';

export default combineReducers({
  auth,
  user,
  student,
  plan,
  registration,
  helporder,
  form: formReducer,
});
