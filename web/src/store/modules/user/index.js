import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@user/UPDATE_PROFILE_REQUEST',
  SUCCESS: '@user/UPDATE_PROFILE_SUCCESS',
  FAIL: '@user/UPDATE_PROFILE_FAILURE',
  AUTH_SIGN_IN: '@auth/SIGN_IN_SUCCESS',
  AUTH_SIGN_OUT: '@auth/SIGN_OUT',
};

// Reducer

const INITIAL_STATE = {
  profile: null,
  loading: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.AUTH_SIGN_IN: {
        draft.profile = action.payload.user;
        draft.loading = false;
        break;
      }
      case Types.SUCCESS: {
        draft.profile = action.payload.profile;
        draft.loading = false;
        break;
      }
      case Types.FAIL: {
        draft.loading = false;
        break;
      }
      case Types.AUTH_SIGN_OUT: {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function updateProfileRequest(data) {
  return {
    type: Types.REQUEST,
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: Types.SUCCESS,
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: Types.FAIL,
  };
}
