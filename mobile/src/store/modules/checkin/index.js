import produce from 'immer';

// Action Types

export const Types = {
  CHECKIN_REQUEST: '@checkin/CHECKIN_REQUEST',
  CHECKIN_SUCCESS: '@checkin/CHECKIN_SUCCESS',
  CHECKIN_FAILURE: '@checkin/CHECKIN_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  checkIns: [],
  loading: false,
};

export default function checkin(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.CHECKIN_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.CHECKIN_SUCCESS: {
        draft.checkIns = action.payload.checkIns;
        draft.loading = false;
        break;
      }
      case Types.CHECKIN_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function checkInRequest(id) {
  return {
    type: Types.CHECKIN_REQUEST,
    payload: { id },
  };
}

export function checkInSuccess(checkIns) {
  return {
    type: Types.CHECKIN_SUCCESS,
    payload: { checkIns },
  };
}

export function checkInFailure() {
  return {
    type: Types.CHECKIN_FAILURE,
  };
}
