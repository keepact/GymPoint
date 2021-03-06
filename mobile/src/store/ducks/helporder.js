import produce from 'immer';
import { Types as TypeAuth } from './auth';

// Action Types

export const Types = {
  HELP_ORDERS_REQUEST: '@helporders/HELP_ORDERS_REQUEST',
  HELP_ORDERS_SUCCESS: '@helporders/HELP_ORDERS_SUCCESS',
  HELP_ORDERS_ANSWER: '@helporders/HELP_ORDERS_ANSWER',
  HELP_ORDERS_REDIRECT: '@helporders/HELP_ORDERS_REDIRECT',
  CREATE_HELP_ORDERS_REQUEST: '@helporders/CREATE_HELP_ORDERS_REQUEST',
  CREATE_HELP_ORDERS_SUCCESS: '@helporders/CREATE_HELP_ORDERS_SUCCESS',
  HELP_ORDERS_FAILURE: '@helporders/HELP_ORDERS_FAILURE',
  NEW_ASNWER: '@helporders/NEW_ASNWER',
};

// Reducer

const INITIAL_STATE = {
  helporders: [],
  helporder: {},
  page: 1,
  lastPage: undefined,
  loading: false,
  loaded: false,
  total: undefined,
};

export default function helporder(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.HELP_ORDERS_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.HELP_ORDERS_SUCCESS: {
        const { currentPage, lastPage, total } = action.payload.pages;

        draft.helporders = action.payload.helpOrders;
        draft.page = currentPage;
        draft.lastPage = lastPage;
        draft.total = total;
        draft.loading = false;

        if (draft.loaded) return;
        draft.loaded = true;
        break;
      }
      case Types.NEW_ASNWER: {
        const questionIndex = draft.helporders.findIndex(
          question => question.id === action.data.id
        );
        draft.helporders[questionIndex] = action.data;
        break;
      }
      case Types.HELP_ORDERS_FAILURE: {
        draft.loading = false;
        break;
      }
      case Types.HELP_ORDERS_ANSWER: {
        draft.helporder = action.payload.data;
        break;
      }
      case Types.CREATE_HELP_ORDERS_SUCCESS: {
        const newQuestions = [action.payload.newQuestion, ...draft.helporders];

        draft.helporders = newQuestions;
        draft.total += 1;
        draft.loading = false;
        break;
      }
      case TypeAuth.SIGN_OUT: {
        draft.helporders = [];
        draft.helporder = {};
        break;
      }
      default:
    }
  });
}

// Action Creators

export function listHelpOrder(page) {
  return {
    type: Types.HELP_ORDERS_REQUEST,
    payload: { page },
  };
}

export function createHelpOrder(data) {
  return {
    type: Types.CREATE_HELP_ORDERS_REQUEST,
    payload: { data },
  };
}

export function redirectHelpOrder(data) {
  return {
    type: Types.HELP_ORDERS_REDIRECT,
    payload: { data },
  };
}
