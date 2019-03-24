import * as types from '..';

import { URL } from '../../config';
import axios from 'axios';
import store from '../../store';

const JOBS_API = `${URL}:8000/api/main/jobs/`;

export function getOffers() {
  return async dispatch => {
    try {
      dispatch({ type: types.GET_OFFERS_PENDING });
      const { data } = await axios.get(JOBS_API);
      dispatch({ type: types.GET_OFFERS_FULFILLED, payload: data });
    } catch (err) {
      dispatch({ type: types.GET_OFFERS_REJECTED, payload: err.message });
    }
  };
}

export function searchOffers(query) {
  return async dispatch => {
    try {
      dispatch({ type: types.GET_OFFERS_PENDING });
      const { data } = await axios.get(`${JOBS_API}?search=${query}`);
      dispatch({ type: types.GET_OFFERS_FULFILLED, payload: data });
    } catch (err) {
      dispatch({ type: types.GET_OFFERS_REJECTED, payload: err.message });
    }
  };
}

export function filterOffers(filter) {
  return async dispatch => {
    try {
      dispatch({ type: types.GET_OFFERS_PENDING });
      const { data } = await axios.get(`${JOBS_API}
?search=${filter.search}
&company__location__icontains=${filter.location}
&overall_experience=${filter.experience}
&salary_low__gt=${filter.minSalary}`);
      dispatch({ type: types.GET_OFFERS_FULFILLED, payload: data });
    } catch (err) {
      dispatch({ type: types.GET_OFFERS_REJECTED, payload: err.message });
    }
  };
}

export function sendApplication(jobId, name, comment) {
  const token = store.getState().auth.token;

  return async dispatch => {
    try {
      dispatch({ type: types.POST_APPLICATION_PENDING });
      const { data } = await axios({
        method: 'POST',
        url: `${JOBS_API}${jobId}/applications/`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        data: JSON.stringify({ name, comment }),
      });

      dispatch({ type: types.POST_APPLICATION_FULFILLED, payload: data });
    } catch (err) {
      dispatch({ type: types.POST_APPLICATION_REJECTED, payload: err.message });
    }
  };
}
