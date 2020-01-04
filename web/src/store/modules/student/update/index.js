import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@student/CREATE_OR_EDIT_REQUEST',
  SUCCESS: '@student/CREATE_OR_EDIT_SUCCESS',
  FAIL: '@student/CREATE_OR_EDIT_FAIL',
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

export function updateOrCreateStudent(data, id) {
  return {
    type: Types.REQUEST,
    payload: { data, id },
  };
}

export function updateOrCreateStudentSuccess(student) {
  return {
    type: Types.SUCCESS,
    payload: { student },
  };
}

export function updateOrCreateStudentFailure() {
  return {
    type: Types.FAIL,
  };
}
