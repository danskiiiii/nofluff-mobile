import {
  LOGIN_FULFILLED,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  REGISTRATION_FULFILLED,
  REGISTRATION_PENDING,
  REGISTRATION_REJECTED,
} from '../actions';

const initialState = {
  error: null,
  token: null,
  isLoggedIn: false,
  isPendingLogin: false,
  isPendingRegistration: false,
  isAwaitingConfirmation: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_PENDING:
      return {
        ...state,
        isPendingRegistration: true,
      };

    case REGISTRATION_FULFILLED:
      return {
        ...state,
        isPendingRegistration: false,
        isAwaitingConfirmation: true,
      };

    case REGISTRATION_REJECTED:
      return {
        ...state,
        isPendingRegistration: false,
        error: action.payload.error,
      };

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
        token: action.payload,
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
