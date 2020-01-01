import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@student/LIST_REQUEST',
  REQUEST_ID: '@student/ID_REQUEST',
  SUCCESS: '@student/LIST_SUCCESS',
  SUCCESS_ID: '@student/ID_SUCCESS',
  CLEAR_VALUE: '@student/CLEAR_VALUE',
  FAIL: '@student/LIST_FAIL',
};

// Reducer

const INITIAL_STATE = {
  student: undefined,
  students: [],
  studentId: null,
  loading: false,
  page: 1,
  lastPage: false,
};

export default function studentList(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.REQUEST_ID: {
        draft.loading = true;
        draft.studentId = action.payload.id;
        break;
      }
      case Types.SUCCESS: {
        draft.loading = false;
        draft.students = action.payload.data;
        draft.page = action.payload.pages.currentPage;
        draft.lastPage = action.payload.pages.lastPage;
        break;
      }
      case Types.SUCCESS_ID: {
        draft.loading = false;
        draft.student = action.payload.data;
        break;
      }
      case Types.CLEAR_VALUE: {
        draft.student = undefined;
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

export function listStudentRequest(page, newList) {
  return {
    type: Types.REQUEST,
    payload: { page, newList },
  };
}

export function listStudentSuccess(data, pages) {
  return {
    type: Types.SUCCESS,
    payload: { data, pages },
  };
}

export function listStudentRequestId(id) {
  return {
    type: Types.REQUEST_ID,
    payload: { id },
  };
}

export function listStudentSuccessId(data) {
  return {
    type: Types.SUCCESS_ID,
    payload: { data },
  };
}

export function listStudentClearValue() {
  return {
    type: Types.CLEAR_VALUE,
  };
}

export function listStudentFailure() {
  return {
    type: Types.FAIL,
  };
}
