import produce from 'immer';

// Action Types

export const Types = {
  DELETE_REGISTRATION_REQUEST: '@registration/DELETE_REGISTRATION_REQUEST',
  DELETE_REGISTRATION_SUCCESS: '@registration/DELETE_REGISTRATION_SUCCESS',
  DELETE_REGISTRATION_FAILURE: '@registration/DELETE_REGISTRATION_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function registrationDelete(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.DELETE_REGISTRATION_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.DELETE_REGISTRATION_SUCCESS: {
        draft.loading = false;
        break;
      }
      case Types.DELETE_REGISTRATION_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function deleteRegistration(id) {
  return {
    type: Types.DELETE_REGISTRATION_REQUEST,
    payload: { id },
  };
}
