import {
  CLEAR_ERRORS,
  GET_COMPANIES_FULFILLED,
  GET_COMPANIES_PENDING,
  GET_COMPANIES_REJECTED,
  GET_OPINIONS_FULFILLED,
  GET_OPINIONS_PENDING,
  GET_OPINIONS_REJECTED,
  POST_OPINION_FULFILLED,
  POST_OPINION_PENDING,
  POST_OPINION_REJECTED,
} from '../actions';

export const initialState = {
  data: [],
  opinions: [],
  loading: false,
  loaded: false,
  postPending: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case GET_OPINIONS_PENDING:
    case GET_COMPANIES_PENDING:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };

    case GET_COMPANIES_FULFILLED: {
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        data: Object.assign([], action.payload),
      };
    }

    case GET_OPINIONS_FULFILLED: {
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        opinions: Object.assign([], action.payload),
      };
    }

    case POST_OPINION_PENDING: {
      return {
        ...state,
        postPending: true,
        error: null,
      };
    }

    case POST_OPINION_FULFILLED: {
      return {
        ...state,
        postPending: false,
        opinions: [...state.opinions, action.payload],
        error: null,
      };
    }

    case POST_OPINION_REJECTED:
    case GET_OPINIONS_REJECTED:
    case GET_COMPANIES_REJECTED:
      return {
        ...state,
        postPending: false,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
