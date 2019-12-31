import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@student/DELETE_REQUEST',
  SUCCESS: '@student/DELETE_SUCCESS',
  FAIL: '@student/DELETE_FAIL',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
  // studentId: '',
};

export default function studentDelete(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.REQUEST: {
        draft.loading = true;
        // draft.studentId = action.payload.id;
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

export function deleteStudentRequest(id) {
  return {
    type: Types.REQUEST,
    payload: { id },
  };
}

export function deleteStudentSuccess() {
  return {
    type: Types.SUCCESS,
    // payload: { student },
  };
}

export function deleteStudentFailure() {
  return {
    type: Types.FAIL,
  };
}
