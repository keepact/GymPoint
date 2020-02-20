import produce from 'immer';

// Action Types

export const Types = {
  CREATE_ANSWER_REQUEST: '@support/CREATE_ANSWER_REQUEST',
  CREATE_ANSWER_SUCCESS: '@support/CREATE_ANSWER_SUCCESS',
  CREATE_ANSWER_FAILURE: '@support/CREATE_ANSWER_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function supportCreate(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.CREATE_ANSWER_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.CREATE_ANSWER_SUCCESS: {
        draft.loading = false;
        break;
      }
      case Types.CREATE_ANSWER_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function createAnswer(data, id) {
  return {
    type: Types.CREATE_ANSWER_REQUEST,
    payload: { data, id },
  };
}
