import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  async function clearAsyncStorage() {
    AsyncStorage.clear();
  }

  clearAsyncStorage();

  const persistedReducer = persistReducer(
    {
      key: 'gympoint',
      storage: AsyncStorage,
      whitelist: ['auth'],
    },
    reducers,
  );

  return persistedReducer;
};
