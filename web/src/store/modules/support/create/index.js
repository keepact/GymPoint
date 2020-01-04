import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@support/CREATE_REQUEST',
  SUCCESS: '@support/CREATE_SUCCESS',
  FAIL: '@support/CREATE_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function supportCreate(state = INITIAL_STATE, action) {
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

export function createSupportRequest(data, id) {
  return {
    type: Types.REQUEST,
    payload: { data, id },
  };
}

export function createSupportSuccess(helpOrders) {
  return {
    type: Types.SUCCESS,
    payload: { helpOrders },
  };
}

export function createSupportFailure() {
  return {
    type: Types.FAIL,
  };
}
