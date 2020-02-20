import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';

import { toast } from 'react-toastify';

import { profileUpdate } from '~/services/user';
import { uploadFile } from '~/services/file';

import { Types } from './index';

export function* updateProfile({ payload }) {
  const { name, email, ...rest } = payload.data;
  const { id: avatar_id } = yield select(state => state.user.profile.avatar);

  const profile = {
    name,
    email,
    avatar_id,
    ...(rest.oldPassword ? rest : {}),
  };

  yield put(startSubmit('PROFILE_FORM'));
  try {
    const { data } = yield call(profileUpdate, profile);

    toast.success('Perfil atualizado com sucesso');

    yield put(stopSubmit('PROFILE_FORM'));
    yield put({
      type: Types.UPDATE_PROFILE_SUCCESS,
      payload: { data },
    });
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.UPDATE_PROFILE_FAILURE,
    });
  }
}

export function* updateAvatar({ payload }) {
  const { data: dataFile } = payload;
  const dataFormated = new FormData();

  dataFormated.append('file', dataFile);

  try {
    const { data } = yield call(uploadFile, dataFormated);

    const { id, url } = data;

    const newAvatar = {
      id,
      url,
    };

    yield put({
      type: Types.UPDATE_AVATAR_SUCCESS,
      payload: { newAvatar },
    });
  } catch (err) {
    toast.error(`Houve um erro, ${err.response.data.error}`);
    yield put({
      type: Types.UPDATE_AVATAR_FAILURE,
    });
  }
}

export default all([
  takeLatest(Types.UPDATE_PROFILE_REQUEST, updateProfile),
  takeLatest(Types.UPDATE_AVATAR_REQUEST, updateAvatar),
]);
