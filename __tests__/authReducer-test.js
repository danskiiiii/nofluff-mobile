import { LOGIN_FULFILLED, LOG_OUT, REGISTRATION_FULFILLED, REGISTRATION_PENDING } from '../actions';

import authReducer from '../reducers/authReducer';

const testState = {
  email: null,
  error: null,
  token: null,
  isLoggedIn: false,
  isPendingLogin: false,
  isPendingRegistration: false,
  isAwaitingConfirmation: false,
};

describe('authReducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(testState);
  });

  it('on REGISTRATION_PENDING', () => {
    expect(
      authReducer(undefined, {
        type: REGISTRATION_PENDING,
      })
    ).toEqual({
      ...testState,
      isPendingRegistration: true,
    });
  });

  it('on REGISTRATION_FULFILLED', () => {
    expect(
      authReducer(undefined, {
        type: REGISTRATION_FULFILLED,
      })
    ).toEqual({
      ...testState,
      isPendingRegistration: false,
      isAwaitingConfirmation: true,
    });
  });

  it('on LOG_OUT', () => {
    expect(authReducer({ ...testState, token: '123-token' }, { type: LOG_OUT })).toEqual({
      ...testState,
      token: null,
    });
  });

  it('on LOGIN_FULFILLED', () => {
    expect(
      authReducer(testState, {
        type: LOGIN_FULFILLED,
        email: 'test@test.com',
        payload: { token: 'jwt-token-123' },
      })
    ).toEqual({
      ...testState,
      isLoggedIn: true,
      token: 'jwt-token-123',
      email: 'test@test.com',
    });
  });
});
