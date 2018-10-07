import authReducer from './authReducer';
import { combineReducers } from 'redux';
import offersReducer from './offersReducer';

export default combineReducers({
  auth: authReducer,
  offers: offersReducer,
});
