import { EActionOrder } from "store/order/order.actions";
import {EActionWs, IWsCloseAction, IWsConnectionClosedAction, IWsConnectionErrorAction, IWsConnectionStartAction, IWsConnectionSuccessAction, IWsGetMessageAction, IWsSendMessageAction } from "./websocket.actions";

export type TWebsocketState = {
  wsConnected: boolean;
  messages: string[];
}

export type TWebsocketActions =
  IWsConnectionStartAction |
  IWsConnectionSuccessAction |
  IWsConnectionErrorAction |
  IWsConnectionClosedAction |
  IWsGetMessageAction |
  IWsSendMessageAction |
  IWsCloseAction;

export type TWsActions = {
  readonly onInit: typeof EActionOrder.WS_GET_ORDERS,
  readonly onStart: typeof EActionWs.WS_CONNECTION_START,
  readonly onOpen: typeof EActionWs.WS_CONNECTION_SUCCESS,
  readonly onError: typeof EActionOrder.WS_ERROR_ORDERS,
  readonly onClose: typeof EActionWs.WS_CLOSE,
  readonly onClosed: typeof EActionWs.WS_CONNECTION_CLOSED,
  readonly onSend: typeof EActionWs.WS_SEND_MESSAGE,
  readonly onMessage: typeof EActionOrder.WS_SET_ORDERS,
}
