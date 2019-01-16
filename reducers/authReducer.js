import {
  CLEAR_ERRORS,
  LOGIN_FULFILLED,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  LOG_OUT,
  REGISTRATION_CONFIRMED,
  REGISTRATION_FULFILLED,
  REGISTRATION_PENDING,
  REGISTRATION_REJECTED,
} from '../actions';

const initialState = {
  email: null,
  error: null,
  token: null,
  isLoggedIn: false,
  isPendingLogin: false,
  isPendingRegistration: false,
  isAwaitingConfirmation: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case LOG_OUT:
      return {
        ...state,
        error: null,
        isLoggedIn: false,
        token: null,
      };

    case REGISTRATION_PENDING:
      return {
        ...state,
        error: null,
        isPendingRegistration: true,
      };

    case REGISTRATION_FULFILLED:
      return {
        ...state,
        error: null,
        isPendingRegistration: false,
        isAwaitingConfirmation: true,
      };

    case REGISTRATION_CONFIRMED:
      return {
        ...state,
        error: null,
        isAwaitingConfirmation: false,
      };

    case REGISTRATION_REJECTED:
      return {
        ...state,
        isPendingRegistration: false,
        error: action.payload.non_field_errors[0],
      };

    case LOGIN_PENDING:
      return {
        ...state,
        error: null,
        isPendingLogin: true,
      };

    case LOGIN_FULFILLED:
      return {
        ...state,
        email: action.email,
        error: null,
        isLoggedIn: true,
        isPendingLogin: false,
        token: action.payload.token,
      };

    case LOGIN_REJECTED:
      return {
        ...state,
        isLoggedIn: false,
        isPendingLogin: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
