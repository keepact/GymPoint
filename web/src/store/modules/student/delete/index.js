import produce from 'immer';

// Action Types

export const Types = {
  DELETE_STUDENT_REQUEST: '@student/DELETE_STUDENT_REQUEST',
  DELETE_STUDENT_SUCCESS: '@student/DELETE_STUDENT_SUCCESS',
  DELETE_STUDENT_FAILURE: '@student/DELETE_STUDENT_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function studentDelete(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.DELETE_STUDENT_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.DELETE_STUDENT_SUCCESS: {
        draft.loading = false;
        break;
      }
      case Types.DELETE_STUDENT_FAILURE: {
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
    type: Types.DELETE_STUDENT_REQUEST,
    payload: { id },
  };
}

export function deleteStudentSuccess() {
  return {
    type: Types.DELETE_STUDENT_SUCCESS,
  };
}

export function deleteStudentFailure() {
  return {
    type: Types.DELETE_STUDENT_FAILURE,
  };
}
