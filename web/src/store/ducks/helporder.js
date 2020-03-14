import produce from 'immer';

// Action Types

export const Types = {
  LIST_QUESTIONS_REQUEST: '@support/LIST_QUESTIONS_REQUEST',
  LIST_QUESTIONS_SUCCESS: '@support/LIST_QUESTIONS_SUCCESS',
  CREATE_ANSWER_REQUEST: '@support/CREATE_ANSWER_REQUEST',
  QUESTION_LOADED: '@support/QUESTION_LOADED',
  NEW_QUESTION: '@student/NEW_QUESTION',
};

// Reducer

const INITIAL_STATE = {
  questions: [],
  loading: false,
  page: 1,
  lastPage: undefined,
};

export default function helporder(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.LIST_QUESTIONS_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.CREATE_ANSWER_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.NEW_QUESTION: {
        const { id, student_id, name, question } = action.data;

        const newQuestion = {
          questionId: id,
          id: student_id,
          name,
          question,
        };

        const newQuestions = [newQuestion, ...draft.questions];
        draft.questions = newQuestions;
        break;
      }
      case Types.LIST_QUESTIONS_SUCCESS: {
        const { currentPage, lastPage } = action.payload.pages;

        draft.questions = action.payload.questions;
        draft.page = currentPage;
        draft.lastPage = lastPage;
        draft.loading = false;
        break;
      }
      case Types.QUESTION_LOADED: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function getAllSupportQuestions(page, newList) {
  return {
    type: Types.LIST_QUESTIONS_REQUEST,
    payload: { page, newList },
  };
}

export function createAnswer(data, id) {
  return {
    type: Types.CREATE_ANSWER_REQUEST,
    payload: { data, id },
  };
}
