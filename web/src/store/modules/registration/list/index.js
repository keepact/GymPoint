import produce from 'immer';

// Action Types

export const Types = {
  LIST_REGISTRATIONS_REQUEST: '@registration/LIST_REGISTRATIONS_REQUEST',
  LIST_REGISTRATIONS_SUCCESS: '@registration/LIST_REGISTRATIONS_SUCCESS',
  LIST_REGISTRATION_ID_REQUEST: '@registration/LIST_REGISTRATION_ID_REQUEST',
  LIST_REGISTRATION_ID_SUCCESS: '@registration/LIST_REGISTRATION_ID_SUCCESS',
  UPDATE_REGISTRATION_INITIAL_STATE:
    '@registration/UPDATE_REGISTRATION_INITIAL_STATE',
  REGISTRATION_REDIRECT: '@registration/REGISTRATION_REDIRECT',
  LIST_REGISTRATIONS_FAILURE: '@registration/LIST_REGISTRATIONS_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  registration: {
    student: undefined,
    plan: undefined,
    start_date: undefined,
    end_date: undefined,
    price: undefined,
  },
  registrations: [],
  registrationId: null,
  loading: false,
  page: 1,
  lastPage: undefined,
  pending: undefined,
  pendingCount: 0,
};

export default function registrationList(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.LIST_REGISTRATIONS_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.LIST_REGISTRATIONS_SUCCESS: {
        const {
          currentPage,
          lastPage,
          pending,
          pendingCount,
        } = action.payload.pages;

        draft.registrations = action.payload.data;

        draft.page = currentPage;
        draft.lastPage = lastPage;
        draft.pending = pending;
        draft.pendingCount = pendingCount;
        draft.loading = false;
        break;
      }
      case Types.LIST_REGISTRATION_ID_REQUEST: {
        draft.loading = true;
        draft.registrationId = action.payload.id;
        break;
      }
      case Types.LIST_REGISTRATION_ID_SUCCESS: {
        draft.loading = false;
        draft.registration = action.payload.data;
        break;
      }
      case Types.UPDATE_REGISTRATION_INITIAL_STATE: {
        if (state.registrationId || state.registration.plan) {
          draft.registration = INITIAL_STATE.registration;
          draft.registrationId = undefined;
        }
        break;
      }
      case Types.LIST_REGISTRATIONS_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function listRegistrationRequest(page, newList) {
  return {
    type: Types.LIST_REGISTRATIONS_REQUEST,
    payload: { page, newList },
  };
}

export function listRegistrationSuccess(data, pages) {
  return {
    type: Types.LIST_REGISTRATIONS_SUCCESS,
    payload: { data, pages },
  };
}

export function listRegistrationRequestId(id) {
  return {
    type: Types.LIST_REGISTRATION_ID_REQUEST,
    payload: { id },
  };
}

export function listRegistrationSuccessId(data) {
  return {
    type: Types.LIST_REGISTRATION_ID_SUCCESS,
    payload: { data },
  };
}

export function listRegistrationCreate() {
  return {
    type: Types.UPDATE_REGISTRATION_INITIAL_STATE,
  };
}

export function listRegistrationRedirect() {
  return {
    type: Types.REGISTRATION_REDIRECT,
  };
}

export function listRegistrationFailure() {
  return {
    type: Types.LIST_REGISTRATIONS_FAILURE,
  };
}
