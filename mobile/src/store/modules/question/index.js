import produce from 'immer';

// Action Types

export const Types = {
  QUESTION_REQUEST: '@question/QUESTION_REQUEST',
  QUESTION_SUCCESS: '@question/QUESTION_SUCCESS',
  QUESTION_FAILURE: '@question/QUESTION_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  questions: [],
  loading: false,
};

export default function question(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.QUESTION_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.QUESTION_SUCCESS: {
        draft.questions = action.payload.questions;
        draft.loading = false;
        break;
      }
      case Types.QUESTION_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function questionRequest(id, newList) {
  return {
    type: Types.QUESTION_REQUEST,
    payload: { id, newList },
  };
}

export function questionSuccess(questions) {
  return {
    type: Types.QUESTION_SUCCESS,
    payload: { questions },
  };
}

export function questionFailure() {
  return {
    type: Types.QUESTION_FAILURE,
  };
}
