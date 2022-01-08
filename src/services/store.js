import {rootReducer} from './reducers';
import thunk from 'redux-thunk';
import {applyMiddleware, compose, createStore} from "redux";

const composeEnhancers =
  (window && (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
