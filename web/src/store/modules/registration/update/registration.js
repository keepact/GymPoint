import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@registration/UPDATE_REQUEST',
  SUCCESS: '@registration/UPDATE_SUCCESS',
  FAIL: '@registration/UPDATE_FAIL',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function registrationUpdate(state = INITIAL_STATE, action) {
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

export function updateRegistrationRequest(data, id) {
  return {
    type: Types.REQUEST,
    payload: { data, id },
  };
}

export function updateRegistrationSuccess(registration) {
  return {
    type: Types.SUCCESS,
    payload: { registration },
  };
}

export function updateRegistrationFailure() {
  return {
    type: Types.FAIL,
  };
}
