import produce from 'immer';

// Action Types

export const Types = {
  CHECKIN_REQUEST: '@checkin/CHECKIN_REQUEST',
  CHECKIN_SUCCESS: '@checkin/CHECKIN_SUCCESS',
  CHECKIN_FAILURE: '@checkin/CHECKIN_FAILURE',
  CREATE_CHECKIN_REQUEST: '@checkin/CREATE_CHECKIN_REQUEST',
  CREATE_CHECKIN_SUCCESS: '@checkin/CREATE_CHECKIN_SUCCESS',
};

// Reducer

const INITIAL_STATE = {
  checkIns: [],
  page: 1,
  lastPage: undefined,
  loading: false,
  total: undefined,
};

export default function checkin(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.CHECKIN_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.CHECKIN_SUCCESS: {
        const { currentPage, lastPage, total } = action.payload.pages;

        draft.checkIns = action.payload.data;
        draft.page = currentPage;
        draft.lastPage = lastPage;
        draft.total = total;
        draft.loading = false;
        break;
      }
      case Types.CREATE_CHECKIN_SUCCESS: {
        const newCheckins = [action.payload.data, ...draft.checkIns];

        draft.checkIns = newCheckins;
        draft.total += 1;
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

export function checkInRequest(page) {
  return {
    type: Types.CHECKIN_REQUEST,
    payload: { page },
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

export function createCheckInRequest() {
  return {
    type: Types.CREATE_CHECKIN_REQUEST,
  };
}

export function createCheckInSuccess(data) {
  return {
    type: Types.CREATE_CHECKIN_SUCCESS,
    payload: { data },
  };
}
