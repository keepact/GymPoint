import storage from 'redux-persist/lib/storage';
import { persistReducer, createTransform } from 'redux-persist';
import { encode, decode } from '~/store/createTransform';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gympoint',
      storage,
      transforms: [createTransform(encode, decode)],
      whitelist: [
        'auth',
        'user',
        'studentList',
        'planList',
        'registrationList',
      ],
    },
    reducers
  );

  return persistedReducer;
};
