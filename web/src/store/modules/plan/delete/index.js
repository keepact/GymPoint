import produce from 'immer';

// Action Types

export const Types = {
  DELETE_PLAN_REQUEST: '@plan/DELETE_PLAN_REQUEST',
  DELETE_PLAN_SUCCESS: '@plan/DELETE_PLAN_SUCCESS',
  DELETE_PLAN_FAILURE: '@plan/DELETE_PLAN_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function planDelete(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.DELETE_PLAN_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.DELETE_PLAN_SUCCESS: {
        draft.loading = false;
        break;
      }
      case Types.DELETE_PLAN_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function deletePlan(id) {
  return {
    type: Types.DELETE_PLAN_REQUEST,
    payload: { id },
  };
}
