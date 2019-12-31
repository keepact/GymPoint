import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@student/LIST_REQUEST',
  SUCCESS: '@student/LIST_SUCCESS',
  FAIL: '@student/LIST_FAIL',
};

// Reducer

const INITIAL_STATE = {
  student: [],
  loading: false,
};

export default function studentList(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.REQUEST: {
        draft.loading = true;
        draft.student = action.payload.id;
        break;
      }
      case Types.SUCCESS: {
        draft.loading = false;
        draft.student = action.payload.data;
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

export function listStudentRequest(id) {
  return {
    type: Types.REQUEST,
    payload: { id },
  };
}

export function listStudentSuccess(data) {
  return {
    type: Types.SUCCESS,
    payload: { data },
  };
}

export function listStudentFailure() {
  return {
    type: Types.FAIL,
  };
}
