import { combineReducers } from 'redux';

import auth from './auth';
import checkin from './checkin';

export default combineReducers({
  auth,
  checkin,
});
