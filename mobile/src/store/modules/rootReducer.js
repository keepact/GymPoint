import { combineReducers } from 'redux';

import auth from './auth';
import checkin from './checkin';
import helporder from './helporder';

export default combineReducers({
  auth,
  checkin,
  helporder,
});
