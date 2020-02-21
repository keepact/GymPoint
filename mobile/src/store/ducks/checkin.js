import produce from 'immer';

// Action Types

export const Types = {
  CHECKIN_REQUEST: '@checkin/CHECKIN_REQUEST',
  CHECKIN_SUCCESS: '@checkin/CHECKIN_SUCCESS',
  CREATE_CHECKIN_REQUEST: '@checkin/CREATE_CHECKIN_REQUEST',
  CREATE_CHECKIN_SUCCESS: '@checkin/CREATE_CHECKIN_SUCCESS',
  CHECKIN_FAILURE: '@checkin/CHECKIN_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  checkIns: [],
  page: 1,
  lastPage: undefined,
  loading: false,
  loaded: false,
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

        draft.checkIns = action.payload.checkIns;
        draft.page = currentPage;
        draft.lastPage = lastPage;
        draft.total = total;
        draft.loading = false;

        if (draft.loaded) return;
        draft.loaded = true;
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

export function listCheckIn(page) {
  return {
    type: Types.CHECKIN_REQUEST,
    payload: { page },
  };
}

export function createCheckIn() {
  return {
    type: Types.CREATE_CHECKIN_REQUEST,
  };
}
