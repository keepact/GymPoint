import { combineReducers } from 'redux';

import auth from './ducks/auth';
import checkin from './ducks/checkin';
import helporder from './ducks/helporder';

export default combineReducers({
  auth,
  checkin,
  helporder,
});
