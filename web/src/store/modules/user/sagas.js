import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { profileUpdate } from '~/services/user';

import { Types, updateProfileSuccess, updateProfileFailure } from './index';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };
    const response = yield call(profileUpdate, 'users', profile);

    toast.success('Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest(Types.REQUEST, updateProfile)]);
