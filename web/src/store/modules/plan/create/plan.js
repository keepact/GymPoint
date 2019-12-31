import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@plan/CREATE_REQUEST',
  SUCCESS: '@plan/CREATE_SUCCESS',
  FAIL: '@plan/CREATE_FAIL',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function planCreate(state = INITIAL_STATE, action) {
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

export function createPlanRequest(data) {
  return {
    type: Types.REQUEST,
    payload: { data },
  };
}

export function createPlanSuccess(plan) {
  return {
    type: Types.SUCCESS,
    payload: { plan },
  };
}

export function createPlanFailure() {
  return {
    type: Types.FAIL,
  };
}
