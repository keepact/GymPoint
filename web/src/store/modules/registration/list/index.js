import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@registration/LIST_REQUEST',
  REQUEST_ID: '@registration/ID_REQUEST',
  SUCCESS: '@registration/LIST_SUCCESS',
  SUCCESS_ID: '@registration/ID_SUCCESS',
  FAIL: '@registration/LIST_FAIL',
  UPDATE_DATE: '@registration/DATE_VALUE',
  UPDATE_PLAN: '@registration/PLAN_VALUE',
  REQUEST_INITIAL_STATE: '@registration/INITIAL_STATE',
  REDIRECT: '@registration/LIST_REDIRECT',
};

// Reducer

const INITIAL_STATE = {
  registration: {
    start_date: undefined,
    end_date: undefined,
    price: undefined,
  },
  registrations: [],
  registrationId: null,
  loading: false,
  page: 1,
  lastPage: false,
  pending: false,
  pendingCount: 0,
};

export default function registrationList(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.REQUEST_ID: {
        draft.loading = true;
        draft.registrationId = action.payload.id;
        break;
      }
      case Types.SUCCESS: {
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
      case Types.SUCCESS_ID: {
        draft.loading = false;
        draft.registration = action.payload.data;
        break;
      }
      case Types.UPDATE_DATE: {
        const { newStartDate, newEndDate } = action.payload.data;
        draft.registration.start_date = newStartDate;
        draft.registration.end_date = newEndDate;
        break;
      }
      case Types.UPDATE_PLAN: {
        const { price, end_date } = action.payload.data;
        const { plan } = action.payload.plan;

        draft.registration.plan = plan;
        draft.registration.end_date = end_date;
        draft.registration.price = price;
        break;
      }
      case Types.REQUEST_INITIAL_STATE: {
        if (state.registrationId || state.registration.plan) {
          draft.registration = INITIAL_STATE.registration;
          draft.registrationId = undefined;
        }
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

export function listRegistrationRequest(page, newList) {
  return {
    type: Types.REQUEST,
    payload: { page, newList },
  };
}

export function listRegistrationSuccess(data, pages) {
  return {
    type: Types.SUCCESS,
    payload: { data, pages },
  };
}

export function listRegistrationRequestId(id) {
  return {
    type: Types.REQUEST_ID,
    payload: { id },
  };
}

export function listRegistrationSuccessId(data) {
  console.log(data, 'action creator registration success');
  return {
    type: Types.SUCCESS_ID,
    payload: { data },
  };
}

export function listRegistrationUpdateDate(data) {
  return {
    type: Types.UPDATE_DATE,
    payload: { data },
  };
}

export function listRegistrationUpdatePlan(plan, data) {
  return {
    type: Types.UPDATE_PLAN,
    payload: { plan, data },
  };
}

export function listRegistrationCreate() {
  return {
    type: Types.REQUEST_INITIAL_STATE,
  };
}

export function listRegistrationRedirect() {
  return {
    type: Types.REDIRECT,
  };
}

export function listRegistrationFailure() {
  return {
    type: Types.FAIL,
  };
}