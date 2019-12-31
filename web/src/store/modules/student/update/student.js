import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@student/UPDATE_REQUEST',
  SUCCESS: '@student/UPDATE_SUCCESS',
  FAIL: '@student/UPDATE_FAIL',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function studentUpdate(state = INITIAL_STATE, action) {
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

export function updateStudentRequest(data, id) {
  return {
    type: Types.REQUEST,
    payload: { data, id },
  };
}

export function updateStudentSuccess(student) {
  return {
    type: Types.SUCCESS,
    payload: { student },
  };
}

export function updateStudentFailure() {
  return {
    type: Types.FAIL,
  };
}
