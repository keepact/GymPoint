import produce from 'immer';

// Action Types

export const Types = {
  CHECKIN_REQUEST: '@checkin/SIGN_IN_REQUEST',
  CHECKIN_SUCCESS: '@checkin/SIGN_IN_SUCCESS',
  CHECKIN_FAILURE: '@checkin/SIGN_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  checkIns: [],
  loading: false,
};

export default function checkin(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.SIGN_IN_SUCCESS: {
        draft.checkIns = action.payload.data;
        draft.loading = false;
        break;
      }
      case Types.SIGN_IN_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function checkInRequest() {
  return {
    type: Types.CHECKIN_REQUEST,
  };
}

export function checkInSuccess(data) {
  return {
    type: Types.CHECKIN_SUCCESS,
    payload: { data },
  };
}

export function checkInFailure() {
  return {
    type: Types.CHECKIN_FAILURE,
  };
}
