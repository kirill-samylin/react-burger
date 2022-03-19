import thunk, {ThunkDispatch} from 'redux-thunk';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {ingredientReducer} from "./ingredient/ingredient.reducer";
import {userReducer} from "./user/user.reducer";
import type {TAppActions, AppState} from "./types";
import { initMiddleware } from './middleware/init';
import { orderReducer } from './order/order.reducer';
import { socketMiddleware } from './websocket/websocket.middleware';
import { TWsActions } from './websocket/websocket.types';
import { EActionWs } from './websocket/websocket.actions';
import { wsReducer } from './websocket/websocket.reducer';
import { EActionOrder } from './order/order.actions';

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  user: userReducer,
  order: orderReducer,
  ws: wsReducer,
});

const wsActions: TWsActions = {
  onInit: EActionOrder.WS_GET_ORDERS,
  onStart: EActionWs.WS_CONNECTION_START,
  onOpen: EActionWs.WS_CONNECTION_SUCCESS,
  onMessage: EActionOrder.WS_SET_ORDERS,
  onError: EActionOrder.WS_ERROR_ORDERS,
  onClose: EActionWs.WS_CLOSE,
  onClosed: EActionWs.WS_CONNECTION_CLOSED,
  onSend: EActionWs.WS_SEND_MESSAGE
}

const webSocketMiddleware = socketMiddleware(wsActions);

const enhancer = composeEnhancers(applyMiddleware(thunk, webSocketMiddleware));

export const store = createStore(rootReducer, enhancer);

(store.dispatch as ThunkDispatch<AppState, unknown, TAppActions>)(initMiddleware());
