import {
  CLEAR_ERRORS,
  GET_OFFERS_FULFILLED,
  GET_OFFERS_PENDING,
  GET_OFFERS_REJECTED,
  POST_APPLICATION_FULFILLED,
  POST_APPLICATION_PENDING,
  POST_APPLICATION_REJECTED,
} from '../actions';

export const initialState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
  postPending: false,
  postSuccessful: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        postSuccessful: false,
      };

    case GET_OFFERS_PENDING:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };

    case GET_OFFERS_FULFILLED: {
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        data: Object.assign([], action.payload),
      };
    }

    case GET_OFFERS_REJECTED:
      return {
        ...state,
        error: action.payload,
      };

    case POST_APPLICATION_PENDING: {
      return {
        ...state,
        postPending: true,
        error: null,
      };
    }

    case POST_APPLICATION_FULFILLED: {
      return {
        ...state,
        postPending: false,
        postSuccessful: true,
        error: null,
      };
    }
    case POST_APPLICATION_REJECTED:
      return {
        ...state,
        postPending: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
