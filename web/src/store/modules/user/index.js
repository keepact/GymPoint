import produce from 'immer';
import { Types as TypeAuth } from '../auth';

// Action Types

export const Types = {
  UPDATE_PROFILE_REQUEST: '@user/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: '@user/UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: '@user/UPDATE_PROFILE_FAILURE',
  UPDATE_AVATAR_REQUEST: '@user/UPDATE_AVATAR_REQUEST',
  UPDATE_AVATAR_SUCCESS: '@user/UPDATE_AVATAR_SUCCESS',
  UPDATE_AVATAR_FAILURE: '@user/UPDATE_AVATAR_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  profile: {
    name: undefined,
    email: undefined,
    password: undefined,
    oldPassword: undefined,
    confirmPassword: undefined,
  },
  loading: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case TypeAuth.SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      case TypeAuth.SIGN_OUT: {
        draft.profile = null;
        break;
      }
      case Types.UPDATE_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.UPDATE_PROFILE_SUCCESS: {
        draft.profile = action.payload.profile;
        draft.loading = false;
        break;
      }
      case Types.UPDATE_PROFILE_FAILURE: {
        draft.loading = false;
        break;
      }
      case Types.UPDATE_AVATAR_SUCCESS: {
        draft.profile.avatar = action.payload.newAvatar;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function updateProfileRequest(data) {
  return {
    type: Types.UPDATE_PROFILE_REQUEST,
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: Types.UPDATE_PROFILE_SUCCESS,
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: Types.UPDATE_PROFILE_FAILURE,
  };
}

export function updateAvatarRequest(data) {
  return {
    type: Types.UPDATE_AVATAR_REQUEST,
    payload: { data },
  };
}

export function updateAvatarSuccess(newAvatar) {
  return {
    type: Types.UPDATE_AVATAR_SUCCESS,
    payload: { newAvatar },
  };
}

export function updateAvatarFailure() {
  return {
    type: Types.UPDATE_AVATAR_FAILURE,
  };
}
