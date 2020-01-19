import produce from 'immer';

// Action Types

export const Types = {
  SIGN_IN_REQUEST: '@auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: '@auth/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: '@auth/SIGN_FAILURE',
  SIGN_OUT: '@auth/SIGN_OUT',
};

// Reducer

const INITIAL_STATE = {
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.SIGN_IN_SUCCESS: {
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case Types.SIGN_IN_FAILURE: {
        draft.loading = false;
        break;
      }
      case Types.SIGN_OUT: {
        draft.signed = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function signInRequest(id) {
  return {
    type: Types.SIGN_IN_REQUEST,
    payload: { id },
  };
}

export function signInSuccess(student) {
  return {
    type: Types.SIGN_IN_SUCCESS,
    payload: { student },
  };
}

export function signFailure() {
  return {
    type: Types.SIGN_IN_FAILURE,
  };
}

export function signOut() {
  return {
    type: Types.SIGN_OUT,
  };
}
