import authReducer from './authReducer';
import { combineReducers } from 'redux';
import offersReducer from './offersReducer';
import ratingsReducer from './ratingsReducer';

export default combineReducers({
  auth: authReducer,
  offers: offersReducer,
  ratings: ratingsReducer,
});
