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
};

// Reducer

const INITIAL_STATE = {
  registration: {
    plan: {
      id: undefined,
      title: 'Selecione',
      duration: undefined,
    },
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

        draft.loading = false;
        draft.registrations = action.payload.data;

        draft.page = currentPage;
        draft.lastPage = lastPage;
        draft.pending = pending;
        draft.pendingCount = pendingCount;
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
        const { newPlan, newEndDate, newPrice } = action.payload.data;

        draft.registration.plan.id = newPlan.id;
        draft.registration.plan.duration = newPlan.duration;
        draft.registration.plan.title = newPlan.title;
        draft.registration.end_date = newEndDate;
        draft.registration.price = newPrice;
        break;
      }
      case Types.REQUEST_INITIAL_STATE: {
        if (draft.registrationId && draft.registration !== undefined) {
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

export function listRegistrationUpdatePlan(data) {
  return {
    type: Types.UPDATE_PLAN,
    payload: { data },
  };
}

export function listRegistrationCreate() {
  return {
    type: Types.REQUEST_INITIAL_STATE,
  };
}

export function listRegistrationFailure() {
  return {
    type: Types.FAIL,
  };
}
