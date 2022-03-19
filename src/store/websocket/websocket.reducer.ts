import { EActionWs } from './websocket.actions';
import {TWebsocketActions, TWebsocketState } from './websocket.types';

export const initialState: TWebsocketState = {
  wsConnected: false,
  messages: [],
};

export const wsReducer = (state = initialState, action: TWebsocketActions): TWebsocketState => {
  switch (action.type) {
    case EActionWs.WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case EActionWs.WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case EActionWs.WS_GET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};
