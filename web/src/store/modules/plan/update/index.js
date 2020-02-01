import produce from 'immer';

// Action Types

export const Types = {
  CREATE_OR_EDIT_PLAN_REQUEST: '@plan/CREATE_OR_EDIT_PLAN_REQUEST',
  CREATE_OR_EDIT_PLAN_SUCCESS: '@plan/CREATE_OR_EDIT_PLAN_SUCCESS',
  CREATE_OR_EDIT_PLAN_FAILURE: '@plan/CREATE_OR_EDIT_PLAN_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function planUpdate(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.CREATE_OR_EDIT_PLAN_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.CREATE_OR_EDIT_PLAN_SUCCESS: {
        draft.loading = false;
        break;
      }
      case Types.CREATE_OR_EDIT_PLAN_FAILURE: {
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
    type: Types.CREATE_OR_EDIT_PLAN_REQUEST,
    payload: { data, id },
  };
}

export function updateOrCreatePlanSuccess(plan) {
  return {
    type: Types.CREATE_OR_EDIT_PLAN_SUCCESS,
    payload: { plan },
  };
}

export function updateOrCreatePlanFailure() {
  return {
    type: Types.CREATE_OR_EDIT_PLAN_FAILURE,
  };
}
