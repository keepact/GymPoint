import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './ducks/auth';
import user from './ducks/user';
import student from './ducks/student';
import plan from './ducks/plan';
import registration from './ducks/registration';
import helporder from './ducks/helporder';

export default combineReducers({
  auth,
  user,
  student,
  plan,
  registration,
  helporder,
  form: formReducer,
});
