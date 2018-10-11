import * as types from '..';

import axios from 'axios';

const API = 'http://192.168.0.12:8000/api/';

// TODO uri and filters in uri
export function getOffers() {
  return async dispatch => {
    try {
      dispatch({ type: types.GET_OFFERS_PENDING });
      const { data } = await axios.get(`${API}main/jobs/`);
      dispatch({ type: types.GET_OFFERS_FULFILLED, payload: data });
    } catch (err) {
      dispatch({ type: types.GET_OFFERS_REJECTED, payload: err.message });
    }
  };
}
