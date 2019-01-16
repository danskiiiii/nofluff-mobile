import * as types from '..';

import { URL } from '../../constants';
import axios from 'axios';

const AUTH_API = `${URL}:44330/auth/`;

export function userLogin(email, password) {
  return async dispatch => {
    try {
      dispatch({ type: types.LOGIN_PENDING });
      const { data } = await axios.post(`${AUTH_API}login/`, { username: 'Admin', password });
      dispatch({ type: types.LOGIN_FULFILLED, payload: data, email });
    } catch (error) {
      dispatch({ type: types.LOGIN_REJECTED, payload: JSON.stringify(error) });
    }
  };
}

export function userRegistration(email, password, username) {
  return async dispatch => {
    try {
      dispatch({ type: types.REGISTRATION_PENDING });
      const { data } = await axios.post(`${AUTH_API}register/`, { email, password, username });
      dispatch({ type: types.REGISTRATION_FULFILLED, payload: data });
    } catch (err) {
      dispatch({ type: types.REGISTRATION_REJECTED, payload: JSON.parse(err.request.response) });
    }
  };
}
