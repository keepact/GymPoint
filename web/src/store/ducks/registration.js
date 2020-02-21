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
  REGISTRATION_LOADED: '@registration/REGISTRATION_LOADED',
  DELETE_REGISTRATION_REQUEST: '@registration/DELETE_REGISTRATION_REQUEST',
  CREATE_OR_EDIT_REGISTRATION_REQUEST:
    '@registration/CREATE_OR_EDIT_REGISTRATION_REQUEST',
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

export default function registration(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.LIST_REGISTRATIONS_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.CREATE_OR_EDIT_REGISTRATION_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.DELETE_REGISTRATION_REQUEST: {
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

        draft.registrations = action.payload.registrations;

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
        draft.registration = action.payload.registration;
        break;
      }
      case Types.UPDATE_REGISTRATION_INITIAL_STATE: {
        if (state.registrationId || state.registration.plan) {
          draft.registration = INITIAL_STATE.registration;
          draft.registrationId = undefined;
        }
        break;
      }
      case Types.REGISTRATION_LOADED: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function getAllRegistrations(page, newList) {
  return {
    type: Types.LIST_REGISTRATIONS_REQUEST,
    payload: { page, newList },
  };
}

export function getRegistrationById(id) {
  return {
    type: Types.LIST_REGISTRATION_ID_REQUEST,
    payload: { id },
  };
}

export function createRegistration() {
  return {
    type: Types.UPDATE_REGISTRATION_INITIAL_STATE,
  };
}

export function redirectRegistration() {
  return {
    type: Types.REGISTRATION_REDIRECT,
  };
}

export function deleteRegistration(id) {
  return {
    type: Types.DELETE_REGISTRATION_REQUEST,
    payload: { id },
  };
}

export function updateOrCreateRegistration(data, id) {
  return {
    type: Types.CREATE_OR_EDIT_REGISTRATION_REQUEST,
    payload: { data, id },
  };
}
