import produce from 'immer';

// Action Types

export const Types = {
  LIST_STUDENTS_REQUEST: '@student/LIST_STUDENTS_REQUEST',
  LIST_STUDENTS_SUCCESS: '@student/LIST_STUDENTS_SUCCESS',
  LIST_STUDENT_ID_REQUEST: '@student/LIST_STUDENT_ID_REQUEST',
  LIST_STUDENT_ID_SUCCESS: '@student/LIST_STUDENT_ID_SUCCESS',
  STUDENT_REDIRECT: '@student/STUDENT_REDIRECT',
  UPDATE_STUDENT_CLEAR_VALUE: '@student/UPDATE_STUDENT_CLEAR_VALUE',
  UPDATE_STUDENT_INITIAL_STATE: '@student/UPDATE_STUDENT_INITIAL_STATE',
  LIST_STUDENTS_FAILURE: '@student/LIST_STUDENTS_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  student: undefined,
  students: [],
  studentId: null,
  loading: false,
  page: 1,
  lastPage: undefined,
};

export default function studentList(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.LIST_STUDENTS_REQUEST: {
        draft.loading = typeof action.payload.student !== 'string';
        break;
      }
      case Types.LIST_STUDENTS_SUCCESS: {
        const { currentPage, lastPage } = action.payload.pages;

        draft.students = action.payload.data;
        draft.page = currentPage;
        draft.lastPage = lastPage;
        draft.loading = false;
        break;
      }
      case Types.LIST_STUDENT_ID_REQUEST: {
        draft.loading = true;
        draft.studentId = action.payload.id;
        break;
      }
      case Types.LIST_STUDENT_ID_SUCCESS: {
        draft.loading = false;
        draft.student = action.payload.data;
        break;
      }
      case Types.UPDATE_STUDENT_INITIAL_STATE: {
        if (state.studentId || state.student) {
          draft.student = undefined;
          draft.studentId = undefined;
        }
        break;
      }
      case Types.LIST_STUDENTS_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function listStudentRequest(page, student) {
  return {
    type: Types.LIST_STUDENTS_REQUEST,
    payload: { page, student },
  };
}

export function listStudentSuccess(data, pages) {
  return {
    type: Types.LIST_STUDENTS_SUCCESS,
    payload: { data, pages },
  };
}

export function listStudentRequestId(id) {
  return {
    type: Types.LIST_STUDENT_ID_REQUEST,
    payload: { id },
  };
}

export function listStudentSuccessId(data) {
  return {
    type: Types.LIST_STUDENT_ID_SUCCESS,
    payload: { data },
  };
}

export function listStudentCreate() {
  return {
    type: Types.UPDATE_STUDENT_INITIAL_STATE,
  };
}

export function listStudentRedirect() {
  return {
    type: Types.STUDENT_REDIRECT,
  };
}

export function listStudentFailure() {
  return {
    type: Types.LIST_STUDENTS_FAILURE,
  };
}
