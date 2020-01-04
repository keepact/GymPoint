import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@registration/CREATE_OR_EDIT_REQUEST',
  SUCCESS: '@registration/CREATE_OR_EDIT_SUCCESS',
  FAIL: '@registration/CREATE_OR_EDIT_FAIL',
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

export function updateOrCreateRegistration(data, id) {
  return {
    type: Types.REQUEST,
    payload: { data, id },
  };
}

export function updateOrCreateRegistrationSuccess(registration) {
  return {
    type: Types.SUCCESS,
    payload: { registration },
  };
}

export function updateOrCreateRegistrationFailure() {
  return {
    type: Types.FAIL,
  };
}
