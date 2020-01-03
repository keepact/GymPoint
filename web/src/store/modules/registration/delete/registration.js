import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@registration/DELETE_REQUEST',
  SUCCESS: '@registration/DELETE_SUCCESS',
  FAIL: '@registration/DELETE_FAIL',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function registrationDelete(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.SUCCESS: {
        draft.loading = false;
        break;
      }
      case Types.FAIL: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function deleteRegistrationRequest(id) {
  return {
    type: Types.REQUEST,
    payload: { id },
  };
}

export function deleteRegistrationSuccess() {
  return {
    type: Types.SUCCESS,
  };
}

export function deleteRegistrationFailure() {
  return {
    type: Types.FAIL,
  };
}
