import * as types from '..';

import { URL } from '../../constants';
import axios from 'axios';

const AUTH_API = `${URL}:8000/api/auth/`;

export function userLogin(email, password) {
  return async dispatch => {
    try {
      dispatch({ type: types.LOGIN_PENDING });
      const { data } = await axios.post(`${AUTH_API}obtain-token/`, { email, password });
      dispatch({ type: types.LOGIN_FULFILLED, payload: data, email });
    } catch (err) {
      dispatch({ type: types.LOGIN_REJECTED, payload: JSON.parse(err.request.response) });
    }
  };
}

export function userRegistration(email, password, name) {
  return async dispatch => {
    try {
      dispatch({ type: types.REGISTRATION_PENDING });
      const { data } = await axios.post(`${AUTH_API}register/`, { email, password, name });
      dispatch({ type: types.REGISTRATION_FULFILLED, payload: data });
    } catch (err) {
      dispatch({ type: types.REGISTRATION_REJECTED, payload: JSON.parse(err.request.response) });
    }
  };
}
