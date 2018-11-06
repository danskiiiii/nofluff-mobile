import * as types from '..';

import { URL } from '../../constants';
import axios from 'axios';
import store from '../../store';

const COMP_API = `${URL}:8000/api/companies/`;

export function getCompanies() {
  return async dispatch => {
    try {
      dispatch({ type: types.GET_COMPANIES_PENDING });
      const { data } = await axios.get(`${COMP_API}`);
      dispatch({ type: types.GET_COMPANIES_FULFILLED, payload: data });
    } catch (err) {
      dispatch({ type: types.GET_COMPANIES_REJECTED, payload: err.message });
    }
  };
}

export function getOpinions(companyId) {
  return async dispatch => {
    try {
      dispatch({ type: types.GET_OPINIONS_PENDING });
      const { data } = await axios.get(`${COMP_API}${companyId}/reviews/`);
      dispatch({ type: types.GET_OPINIONS_FULFILLED, payload: data });
    } catch (err) {
      dispatch({ type: types.GET_OPINIONS_REJECTED, payload: err.message });
    }
  };
}

export function postReview(companyId, review, rating) {
  const token = store.getState().auth.token;

  return async dispatch => {
    try {
      dispatch({ type: types.POST_OPINION_PENDING });
      const { data } = await axios({
        method: 'POST',
        url: `${COMP_API}${companyId}/reviews/`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        data: JSON.stringify({ review, rating }),
      });

      dispatch({ type: types.POST_OPINION_FULFILLED, payload: data });
    } catch (err) {
      dispatch({ type: types.POST_OPINION_REJECTED, payload: err.message });
    }
  };
}
