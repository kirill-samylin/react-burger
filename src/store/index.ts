import thunk, {ThunkDispatch} from 'redux-thunk';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {ingredientReducer} from "./ingredient/ingredient.reducer";
import {userReducer} from "./user/user.reducer";
import type {AppActions, AppState} from "./types";
import {userInitMiddleware} from "./user/user-init.middleware";
import { getIngredients } from './ingredient/ingredient.actions';

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  user: userReducer,
});

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore<AppState, AppActions, {}, {}>(rootReducer, enhancer);

(store.dispatch as ThunkDispatch<AppState, unknown, AppActions>)(getIngredients());
(store.dispatch as ThunkDispatch<AppState, unknown, AppActions>)(userInitMiddleware());
