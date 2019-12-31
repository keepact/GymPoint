import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@plan/UPDATE_REQUEST',
  SUCCESS: '@plan/UPDATE_SUCCESS',
  FAIL: '@plan/UPDATE_FAIL',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function planUpdate(state = INITIAL_STATE, action) {
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

export function updatePlanRequest(data, id) {
  return {
    type: Types.REQUEST,
    payload: { data, id },
  };
}

export function updatePlanSuccess(plan) {
  return {
    type: Types.SUCCESS,
    payload: { plan },
  };
}

export function updatePlanFailure() {
  return {
    type: Types.FAIL,
  };
}
