import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import { store, persistor } from './store';
import App from './App';

import Header from '~/components/Header';
import Background from '~/components/Background';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Background />
        <Header />
        <App />
      </PersistGate>
    </Provider>
  );
}
