import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../types';
import { TWebsocketActions, TWsActions } from './websocket.types';

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return next => (action: TWebsocketActions) => {
      const { dispatch } = store;
      const { onInit, onStart, onOpen, onMessage, onError, onClose, onClosed, onSend } = wsActions;
      switch (action.type) {
        case onStart: {
          dispatch({type: onInit});
          socket = new WebSocket(action.payload);
          if (socket) {
            socket.onopen = () => {
              dispatch({type: onOpen});
            };

            socket.onerror = event => {
              dispatch({type: onError, payload: event});
            };

            socket.onmessage = event => {
              const {data} = event;
              const parsedData = JSON.parse(data);
              dispatch({type: onMessage, payload: parsedData});
            };

            socket.onclose = event => {
              dispatch({type: onClosed, payload: event});
            };
          }
          break;
        }
        case onSend: {
          if (socket) {
            const message = action.payload;
            socket.send(JSON.stringify(message));
          }
          break;
        }
        case onClose: {
          if (socket) {
            socket.close();
          }
          break;
        }
        default: {
          next(action);
        }
      }
    };
  }) as Middleware;
};
