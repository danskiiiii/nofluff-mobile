import * as types from '..';

import axios from 'axios';

const API = 'http://192.168.0.12:8000/api/';

export function userLogin(email, password) {
  return async dispatch => {
    try {
      dispatch({ type: types.LOGIN_PENDING });
      const { data } = await axios.post(`${API}auth/obtain-token/`, { email, password });
      dispatch({ type: types.LOGIN_FULFILLED, payload: data });
    } catch (err) {
      dispatch({ type: types.LOGIN_REJECTED, payload: err.request.response });
    }
  };
}

export function userRegistration(email, password, name) {
  return async dispatch => {
    try {
      dispatch({ type: types.REGISTRATION_PENDING });
      const { data } = await axios.post(`${API}auth/register/`, { email, password, name });
      dispatch({ type: types.REGISTRATION_FULFILLED, payload: data });
    } catch (err) {
      dispatch({ type: types.REGISTRATION_REJECTED, payload: err.request.response });
    }
  };
}
