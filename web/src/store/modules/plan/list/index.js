import produce from 'immer';

// Action Types

export const Types = {
  LIST_PLANS_REQUEST: '@plan/LIST_PLANS_REQUEST',
  LIST_PLANS_SUCCESS: '@plan/LIST_PLANS_SUCCESS',
  LIST_PLAN_ID_REQUEST: '@plan/LIST_PLAN_ID_REQUEST',
  LIST_PLAN_ID_SUCCESS: '@plan/LIST_PLAN_ID_SUCCESS',
  UPDATE_PLAN_TOTAL_REQUEST: '@plan/UPDATE_PLAN_TOTAL_REQUEST',
  UPDATE_PLAN_TOTAL_SUCCESS: '@plan/UPDATE_PLAN_TOTAL_SUCCESS',
  UPDATE_PLAN_INITIAL_STATE: '@plan/UPDATE_PLAN_INITIAL_STATE',
  PLAN_REDIRECT: '@plan/PLAN_REDIRECT',
  LIST_PLANS_FAILURE: '@plan/LIST_PLANS_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  plan: {
    id: undefined,
    duration: undefined,
    price: undefined,
    total: undefined,
  },
  plans: [],
  planId: null,
  loading: false,
  page: 1,
  lastPage: undefined,
};

export default function planList(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.LIST_PLANS_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.LIST_PLANS_SUCCESS: {
        const { currentPage, lastPage } = action.payload.pages;

        draft.plans = action.payload.data;
        draft.page = currentPage;
        draft.lastPage = lastPage;
        draft.loading = false;
        break;
      }
      case Types.LIST_PLAN_ID_REQUEST: {
        draft.loading = true;
        draft.planId = action.payload.id;
        break;
      }
      case Types.LIST_PLAN_ID_SUCCESS: {
        draft.loading = false;
        draft.plan = action.payload.data;
        break;
      }
      case Types.UPDATE_PLAN_TOTAL_SUCCESS: {
        const { duration, price, total } = action.payload.data;

        draft.plan.duration = duration || draft.plan.duration;
        draft.plan.price = price || draft.plan.price;
        draft.plan.total = total;
        break;
      }
      case Types.UPDATE_PLAN_INITIAL_STATE: {
        if (state.planId || state.plan) {
          draft.plan = INITIAL_STATE.plan;
          draft.planId = undefined;
        }
        break;
      }
      case Types.LIST_PLANS_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function listPlanRequest(page, newList) {
  return {
    type: Types.LIST_PLANS_REQUEST,
    payload: { page, newList },
  };
}

export function listPlanSuccess(data, pages) {
  return {
    type: Types.LIST_PLANS_SUCCESS,
    payload: { data, pages },
  };
}

export function listPlanRequestId(id) {
  return {
    type: Types.LIST_PLAN_ID_REQUEST,
    payload: { id },
  };
}

export function listPlanSuccessId(data) {
  return {
    type: Types.LIST_PLAN_ID_SUCCESS,
    payload: { data },
  };
}

export function updatePlanTotalRequest(data, type) {
  return {
    type: Types.UPDATE_PLAN_TOTAL_REQUEST,
    payload: { data, type },
  };
}

export function updatePlanTotalSuccess(data) {
  return {
    type: Types.UPDATE_PLAN_TOTAL_SUCCESS,
    payload: { data },
  };
}

export function listPlanCreate() {
  return {
    type: Types.UPDATE_PLAN_INITIAL_STATE,
  };
}

export function listPlanRedirect() {
  return {
    type: Types.PLAN_REDIRECT,
  };
}

export function listPlanFailure() {
  return {
    type: Types.LIST_PLANS_FAILURE,
  };
}
