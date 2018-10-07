import { LOGIN_FULFILLED, LOGIN_PENDING, LOGIN_REJECTED } from '../actions';

const initialState = {
  error: null,
  token: null,
  isLoggedIn: false,
  isPendingLogin: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isPendingLogin: true,
      };
    case LOGIN_FULFILLED:
      return {
        ...state,
        isLoggedIn: true,
        isPendingLogin: false,
        ...userOnSuccess,
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        isLoggedIn: false,
        isPendingLogin: false,
      };

    default:
      return state;
  }
}
