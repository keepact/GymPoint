import produce from 'immer';

// Action Types

export const Types = {
  FILTER_STUDENTS_REQUEST: '@student/FILTER_STUDENTS_REQUEST',
  FILTER_STUDENTS_SUCCESS: '@student/FILTER_STUDENTS_SUCCESS',
  LIST_STUDENTS_REQUEST: '@student/LIST_STUDENTS_REQUEST',
  LIST_STUDENTS_SUCCESS: '@student/LIST_STUDENTS_SUCCESS',
  LIST_STUDENT_ID_REQUEST: '@student/LIST_STUDENT_ID_REQUEST',
  LIST_STUDENT_ID_SUCCESS: '@student/LIST_STUDENT_ID_SUCCESS',
  STUDENT_REDIRECT: '@student/STUDENT_REDIRECT',
  UPDATE_STUDENT_INITIAL_STATE: '@student/UPDATE_STUDENT_INITIAL_STATE',
  CREATE_OR_EDIT_STUDENT_REQUEST: '@student/CREATE_OR_EDIT_STUDENT_REQUEST',
  STUDENT_LOADED: '@student/STUDENT_LOADED',
  DELETE_STUDENT_REQUEST: '@student/DELETE_STUDENT_REQUEST',
};

// Reducer

const INITIAL_STATE = {
  student: undefined,
  students: [],
  filteredStudent: {},
  studentId: null,
  loading: false,
  page: 1,
  lastPage: undefined,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.LIST_STUDENTS_REQUEST: {
        draft.loading = typeof action.payload.student !== 'string';
        break;
      }
      case Types.CREATE_OR_EDIT_STUDENT_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.DELETE_STUDENT_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.LIST_STUDENTS_SUCCESS: {
        const { currentPage, lastPage } = action.payload.pages;

        draft.students = action.payload.students;
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
        draft.student = action.payload.student;
        break;
      }
      case Types.UPDATE_STUDENT_INITIAL_STATE: {
        if (state.studentId || state.student) {
          draft.student = undefined;
          draft.studentId = undefined;
        }
        break;
      }
      case Types.FILTER_STUDENTS_SUCCESS: {
        draft.filteredStudent = action.payload.students;
        break;
      }
      case Types.STUDENT_LOADED: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function getAllStudents(page, student) {
  return {
    type: Types.LIST_STUDENTS_REQUEST,
    payload: { page, student },
  };
}

export function filterStudent(student) {
  return {
    type: Types.FILTER_STUDENTS_REQUEST,
    payload: { student },
  };
}

export function getStudentById(id) {
  return {
    type: Types.LIST_STUDENT_ID_REQUEST,
    payload: { id },
  };
}

export function createStudent() {
  return {
    type: Types.UPDATE_STUDENT_INITIAL_STATE,
  };
}

export function redirectStudent() {
  return {
    type: Types.STUDENT_REDIRECT,
  };
}

export function updateOrCreateStudent(data, id) {
  return {
    type: Types.CREATE_OR_EDIT_STUDENT_REQUEST,
    payload: { data, id },
  };
}

export function deleteStudent(id) {
  return {
    type: Types.DELETE_STUDENT_REQUEST,
    payload: { id },
  };
}
