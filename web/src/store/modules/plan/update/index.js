import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@plan/CREATE_OR_EDIT_REQUEST',
  SUCCESS: '@plan/CREATE_OR_EDIT_SUCCESS',
  FAIL: '@plan/CREATE_OR_EDIT_FAIL',
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

export function updateOrCreatePlan(data, id) {
  return {
    type: Types.REQUEST,
    payload: { data, id },
  };
}

export function updateOrCreatePlanSuccess(plan) {
  return {
    type: Types.SUCCESS,
    payload: { plan },
  };
}

export function updateOrCreatePlanFailure() {
  return {
    type: Types.FAIL,
  };
}