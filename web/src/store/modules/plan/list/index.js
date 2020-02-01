import produce from 'immer';

// Action Types

export const Types = {
  LIST_PLANS_REQUEST: '@plan/LIST_PLANS_REQUEST',
  LIST_PLANS_SUCCESS: '@plan/LIST_PLANS_SUCCESS',
  LIST_PLAN_ID_REQUEST: '@plan/LIST_PLAN_ID_REQUEST',
  LIST_PLAN_ID_SUCCESS: '@plan/LIST_PLAN_ID_SUCCESS',
  UPDATE_PLAN_DURATION: '@plan/UPDATE_PLAN_DURATION',
  UPDATE_PLAN_PRICE: '@plan/UPDATE_PLAN_PRICE',
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
    finalPrice: undefined,
  },
  plans: [],
  planId: null,
  loading: false,
  page: 1,
  lastPage: false,
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
      case Types.UPDATE_PLAN_DURATION: {
        const { duration } = action.payload;

        draft.plan.duration = duration;
        draft.plan.finalPrice = draft.plan.price * duration;
        break;
      }
      case Types.UPDATE_PLAN_PRICE: {
        const { price } = action.payload;

        draft.plan.price = price;
        draft.plan.finalPrice = draft.plan.duration * price;
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

export function listPlanUpdateDuration(duration) {
  return {
    type: Types.UPDATE_PLAN_DURATION,
    payload: { duration },
  };
}

export function listPlanUpdatePrice(price) {
  return {
    type: Types.UPDATE_PLAN_PRICE,
    payload: { price },
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
