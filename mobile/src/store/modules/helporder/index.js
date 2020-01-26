import produce from 'immer';
import { Types as TypeAuth } from '../auth';

// Action Types

export const Types = {
  HELP_ORDERS_REQUEST: '@helporders/HELP_ORDERS_REQUEST',
  HELP_ORDERS_SUCCESS: '@helporders/HELP_ORDERS_SUCCESS',
  HELP_ORDERS_FAILURE: '@helporders/HELP_ORDERS_FAILURE',
  HELP_ORDERS_ANSWER: '@helporders/HELP_ORDERS_ANSWER',
  HELP_ORDERS_REDIRECT: '@helporders/REDIRECT',
};

// Reducer

const INITIAL_STATE = {
  helporders: [],
  helporder: {},
  loading: false,
};

export default function helporder(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.HELP_ORDERS_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.HELP_ORDERS_SUCCESS: {
        draft.helporders = action.payload.data;
        draft.loading = false;
        break;
      }
      case Types.HELP_ORDERS_FAILURE: {
        draft.loading = false;
        break;
      }
      case Types.HELP_ORDERS_ANSWER: {
        draft.helporder = action.payload.item;
        break;
      }
      case TypeAuth.SIGN_OUT: {
        draft.helporders = INITIAL_STATE.helporders;
        draft.helporder = INITIAL_STATE.helporder;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function helpOrderRequest(id, data) {
  return {
    type: Types.HELP_ORDERS_REQUEST,
    payload: { id, data },
  };
}

export function helpOrderSuccess(data) {
  return {
    type: Types.HELP_ORDERS_SUCCESS,
    payload: { data },
  };
}

export function helpOrderFailure() {
  return {
    type: Types.HELP_ORDERS_FAILURE,
  };
}

export function helpOrderAnswer(item) {
  return {
    type: Types.HELP_ORDERS_ANSWER,
    payload: { item },
  };
}

export function helpOrderRedirect(data) {
  return {
    type: Types.HELP_ORDERS_REDIRECT,
    payload: { data },
  };
}
