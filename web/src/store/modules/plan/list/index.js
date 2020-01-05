import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@plan/LIST_REQUEST',
  REQUEST_ID: '@plan/ID_REQUEST',
  SUCCESS: '@plan/LIST_SUCCESS',
  SUCCESS_ID: '@plan/ID_SUCCESS',
  UPDATE_DURATION: '@plan/DURATION_SUCCESS',
  UPDATE_PRICE: '@plan/PRICE_SUCCESS',
  REQUEST_INITIAL_STATE: '@plan/INITIAL_STATE',
  REDIRECT: '@plan/LIST_REDIRECT',
  FAIL: '@plan/LIST_FAIL',
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
      case Types.REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.REQUEST_ID: {
        draft.loading = true;
        draft.planId = action.payload.id;
        break;
      }
      case Types.SUCCESS: {
        const { currentPage, lastPage } = action.payload.pages;

        draft.plans = action.payload.data;
        draft.page = currentPage;
        draft.lastPage = lastPage;
        draft.loading = false;
        break;
      }
      case Types.SUCCESS_ID: {
        draft.loading = false;
        draft.plan = action.payload.data;
        break;
      }
      case Types.UPDATE_DURATION: {
        const { duration } = action.payload;

        draft.plan.duration = duration;
        draft.plan.finalPrice = draft.plan.price * duration;
        break;
      }
      case Types.UPDATE_PRICE: {
        const { price } = action.payload;

        draft.plan.price = price;
        draft.plan.finalPrice = draft.plan.duration * price;
        break;
      }
      case Types.REQUEST_INITIAL_STATE: {
        if (state.planId || state.plan) {
          draft.plan = INITIAL_STATE.plan;
          draft.planId = undefined;
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

export function listPlanRequest(page, newList) {
  return {
    type: Types.REQUEST,
    payload: { page, newList },
  };
}

export function listPlanSuccess(data, pages) {
  return {
    type: Types.SUCCESS,
    payload: { data, pages },
  };
}

export function listPlanRequestId(id) {
  return {
    type: Types.REQUEST_ID,
    payload: { id },
  };
}

export function listPlanSuccessId(data) {
  return {
    type: Types.SUCCESS_ID,
    payload: { data },
  };
}

export function listPlanUpdatePrice(price) {
  return {
    type: Types.UPDATE_PRICE,
    payload: { price },
  };
}

export function listPlanUpdateDuration(duration) {
  return {
    type: Types.UPDATE_DURATION,
    payload: { duration },
  };
}

export function listPlanCreate() {
  return {
    type: Types.REQUEST_INITIAL_STATE,
  };
}

export function listPlanRedirect() {
  return {
    type: Types.REDIRECT,
  };
}

export function listPlanFailure() {
  return {
    type: Types.FAIL,
  };
}
