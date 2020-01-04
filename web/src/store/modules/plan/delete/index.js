import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@plan/DELETE_REQUEST',
  SUCCESS: '@plan/DELETE_SUCCESS',
  FAIL: '@plan/DELETE_FAIL',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function planDelete(state = INITIAL_STATE, action) {
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

export function deletePlanRequest(id) {
  return {
    type: Types.REQUEST,
    payload: { id },
  };
}

export function deletePlanSuccess() {
  return {
    type: Types.SUCCESS,
  };
}

export function deletePlanFailure() {
  return {
    type: Types.FAIL,
  };
}
