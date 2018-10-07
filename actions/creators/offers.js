import * as types from '../';

import axios from 'axios';

// TODO uri and filters in uri
export function getOffers(location = '', experience = '') {
  return async dispatch => {
    try {
      dispatch({ type: types.GET_OFFERS_PENDING });
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`);
      dispatch({
        type: types.GET_OFFERS_FULFILLED,
        payload: data,
      });
    } catch (err) {
      dispatch({ type: types.GET_OFFERS_REJECTED, payload: err.message });
    }
  };
}
