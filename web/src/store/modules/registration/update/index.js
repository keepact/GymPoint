import produce from 'immer';

// Action Types

export const Types = {
  CREATE_OR_EDIT_REGISTRATION_REQUEST:
    '@registration/CREATE_OR_EDIT_REGISTRATION_REQUEST',
  CREATE_OR_EDIT_REGISTRATION_SUCCESS:
    '@registration/CREATE_OR_EDIT_REGISTRATION_SUCCESS',
  CREATE_OR_EDIT_REGISTRATION_FAILURE:
    '@registration/CREATE_OR_EDIT_REGISTRATION_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function registrationUpdate(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.CREATE_OR_EDIT_REGISTRATION_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.CREATE_OR_EDIT_REGISTRATION_SUCCESS: {
        draft.loading = false;
        break;
      }
      case Types.CREATE_OR_EDIT_REGISTRATION_FAILURE: {
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
    type: Types.CREATE_OR_EDIT_REGISTRATION_REQUEST,
    payload: { data, id },
  };
}

export function updateOrCreateRegistrationSuccess(registration) {
  return {
    type: Types.CREATE_OR_EDIT_REGISTRATION_SUCCESS,
    payload: { registration },
  };
}

export function updateOrCreateRegistrationFailure() {
  return {
    type: Types.CREATE_OR_EDIT_REGISTRATION_FAILURE,
  };
}
