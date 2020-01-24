import { combineReducers } from 'redux';

import auth from './auth';
import checkin from './checkin';
import question from './question';

export default combineReducers({
  auth,
  checkin,
  question,
});
