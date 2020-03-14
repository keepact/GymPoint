import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import { configurePusher } from 'pusher-redux/react-native';

import './config/ReactotronConfig';

import { PUSHER_KEY } from 'react-native-dotenv';
import { store, persistor } from './store';
import App from './App';

import Header from '~/components/Header';
import Background from '~/components/Background';

export default function Index() {
  const options = {
    cluster: 'us2',
    useTLS: true,
    activityTimeout: 6000,
  };

  configurePusher(store, PUSHER_KEY, options);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Background />
        <Header />
        <App />
      </PersistGate>
    </Provider>
  );
}
