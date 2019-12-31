import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@student/CREATE_REQUEST',
  SUCCESS: '@student/CREATE_SUCCESS',
  FAIL: '@student/CREATE_FAIL',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function studentCreate(state = INITIAL_STATE, action) {
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

export function createStudentRequest(data) {
  return {
    type: Types.REQUEST,
    payload: { data },
  };
}

export function createStudentSuccess(student) {
  return {
    type: Types.SUCCESS,
    payload: { student },
  };
}

export function createStudentFailure() {
  return {
    type: Types.FAIL,
  };
}
