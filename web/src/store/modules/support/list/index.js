import produce from 'immer';

// Action Types

export const Types = {
  LIST_QUESTIONS_REQUEST: '@support/LIST_QUESTIONS_REQUEST',
  LIST_QUESTIONS_SUCCESS: '@support/LIST_QUESTIONS_SUCCESS',
  LIST_QUESTIONS_FAILURE: '@support/LIST_QUESTIONS_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  questions: [],
  loading: false,
  page: 1,
  lastPage: undefined,
};

export default function supportList(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.LIST_QUESTIONS_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.LIST_QUESTIONS_SUCCESS: {
        const { currentPage, lastPage } = action.payload.pages;

        draft.questions = action.payload.data;
        draft.page = currentPage;
        draft.lastPage = lastPage;
        draft.loading = false;
        break;
      }
      case Types.LIST_QUESTIONS_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function listSupportRequest(page, newList) {
  return {
    type: Types.LIST_QUESTIONS_REQUEST,
    payload: { page, newList },
  };
}

export function listSupportSuccess(data, pages) {
  return {
    type: Types.LIST_QUESTIONS_SUCCESS,
    payload: { data, pages },
  };
}

export function listSupportFailure() {
  return {
    type: Types.LIST_QUESTIONS_FAILURE,
  };
}
