import produce from 'immer';

// Action Types

export const Types = {
  CHECKIN_REQUEST: '@checkin/CHECKIN_REQUEST',
  CHECKIN_SUCCESS: '@checkin/CHECKIN_SUCCESS',
  CHECKIN_FAILURE: '@checkin/CHECKIN_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  checkIns: [],
  page: 1,
  lastPage: '',
  loading: false,
};

export default function checkin(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.CHECKIN_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.CHECKIN_SUCCESS: {
        const { currentPage, lastPage } = action.payload.pages;

        draft.checkIns = action.payload.data;
        draft.page = currentPage;
        draft.lastPage = lastPage;
        draft.loading = false;
        break;
      }
      case Types.CHECKIN_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function checkInRequest(page, refresh) {
  return {
    type: Types.CHECKIN_REQUEST,
    payload: { page, refresh },
  };
}

export function checkInSuccess(data, pages) {
  return {
    type: Types.CHECKIN_SUCCESS,
    payload: { data, pages },
  };
}

export function checkInFailure() {
  return {
    type: Types.CHECKIN_FAILURE,
  };
}
