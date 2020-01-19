import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from './pages/SignIn';
import CheckIn from './pages/CheckIn';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    CheckIn,
  }),
);
