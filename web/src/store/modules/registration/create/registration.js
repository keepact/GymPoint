import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@registration/CREATE_REQUEST',
  SUCCESS: '@registration/CREATE_SUCCESS',
  FAIL: '@registration/CREATE_FAIL',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function registrationCreate(state = INITIAL_STATE, action) {
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

export function createRegistrationRequest(data) {
  return {
    type: Types.REQUEST,
    payload: { data },
  };
}

export function createRegistrationSuccess(student) {
  return {
    type: Types.SUCCESS,
    payload: { student },
  };
}

export function createRegistrationFailure() {
  return {
    type: Types.FAIL,
  };
}
