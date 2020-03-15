import 'react-native-gesture-handler';
import * as React from 'react';
import { useSelector } from 'react-redux';

import Routes from './routes';

export default function App() {
  const { signed } = useSelector(state => state.auth);

  return <Routes isSigned={signed} />;
}
