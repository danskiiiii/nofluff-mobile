import { GET_OFFERS_FULFILLED, GET_OFFERS_PENDING, GET_OFFERS_REJECTED } from '../actions';

export const initialState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_OFFERS_PENDING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };

    case GET_OFFERS_FULFILLED: {
      return {
        ...state,
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

    default:
      return state;
  }
}
