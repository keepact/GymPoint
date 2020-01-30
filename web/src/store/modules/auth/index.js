import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@auth/SIGN_IN_REQUEST',
  SUCCESS: '@auth/SIGN_IN_SUCCESS',
  FAIL: '@auth/SIGN_FAILURE',
  LOGOUT: '@auth/SIGN_OUT',
};

// Reducer

const INITIAL_STATE = {
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.SUCCESS: {
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case Types.FAIL: {
        draft.loading = false;
        break;
      }
      case Types.LOGOUT: {
        draft.signed = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function signInRequest(email, password) {
  return {
    type: Types.REQUEST,
    payload: { email, password },
  };
}

export function signInSuccess(user) {
  return {
    type: Types.SUCCESS,
    payload: { user },
  };
}

export function signFailure() {
  return {
    type: Types.FAIL,
  };
}

export function signOut() {
  return {
    type: Types.LOGOUT,
  };
}
