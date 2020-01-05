import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@support/LIST_REQUEST',
  SUCCESS: '@support/LIST_SUCCESS',
  FAIL: '@support/LIST_FAIL',
};

// Reducer

const INITIAL_STATE = {
  questions: [],
  loading: false,
  page: 1,
  lastPage: '',
};

export default function supportList(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.SUCCESS: {
        const { currentPage, lastPage } = action.payload.pages;

        draft.questions = action.payload.data;
        draft.page = currentPage;
        draft.lastPage = lastPage;
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

export function listSupportRequest(page, newList) {
  return {
    type: Types.REQUEST,
    payload: { page, newList },
  };
}

export function listSupportSuccess(data, pages) {
  return {
    type: Types.SUCCESS,
    payload: { data, pages },
  };
}

export function listSupportFailure() {
  return {
    type: Types.FAIL,
  };
}
