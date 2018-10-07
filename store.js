import { applyMiddleware, createStore } from 'redux';

import { createLogger } from 'redux-logger';
import reducers from './reducers';
import thunk from 'redux-thunk';

const middleware = [thunk];

middleware.push(createLogger({ diff: true }));

const store = createStore(reducers, applyMiddleware(...middleware));

export default store;
