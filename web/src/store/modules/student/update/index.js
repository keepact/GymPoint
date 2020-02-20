import produce from 'immer';

// Action Types

export const Types = {
  CREATE_OR_EDIT_STUDENT_REQUEST: '@student/CREATE_OR_EDIT_STUDENT_REQUEST',
  CREATE_OR_EDIT_STUDENT_SUCCESS: '@student/CREATE_OR_EDIT_STUDENT_SUCCESS',
  CREATE_OR_EDIT_STUDENT_FAILURE: '@student/CREATE_OR_EDIT_STUDENT_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  loading: false,
};

export default function studentUpdate(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.CREATE_OR_EDIT_STUDENT_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.CREATE_OR_EDIT_STUDENT_SUCCESS: {
        draft.loading = false;
        break;
      }
      case Types.CREATE_OR_EDIT_STUDENT_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function updateOrCreateStudent(data, id) {
  return {
    type: Types.CREATE_OR_EDIT_STUDENT_REQUEST,
    payload: { data, id },
  };
}
