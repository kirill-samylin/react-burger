export enum EActionWs {
  WS_CONNECTION_INIT = 'WS_CONNECTION_INIT',
  WS_CONNECTION_START = 'WS_CONNECTION_START',
  WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS',
  WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR',
  WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED',
  WS_GET_MESSAGE = 'WS_GET_MESSAGE',
  WS_SEND_MESSAGE = 'WS_SEND_MESSAGE',
  WS_CLOSE = 'WS_CLOSE'
}

export interface IWsConnectionStartAction {
  readonly type: typeof EActionWs.WS_CONNECTION_START;
  payload: string;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof EActionWs.WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof EActionWs.WS_CONNECTION_ERROR;
  payload: Event;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof EActionWs.WS_CONNECTION_CLOSED;
}

export interface IWsGetMessageAction {
  readonly type: typeof EActionWs.WS_GET_MESSAGE;
  payload: string;
}

export interface IWsSendMessageAction {
  readonly type: typeof EActionWs.WS_SEND_MESSAGE,
  payload: string
}

export interface IWsCloseAction {
  readonly type: typeof EActionWs.WS_CLOSE
}

export const webSocketActions = {
  wsConnectionStart: (payload: string): IWsConnectionStartAction => ({
    type: EActionWs.WS_CONNECTION_START,
    payload,
  }),
  wsConnectionSuccess: (): IWsConnectionSuccessAction => ({
    type: EActionWs.WS_CONNECTION_SUCCESS,
  }),
  wsConnectionClosed: (): IWsConnectionClosedAction => ({
    type: EActionWs.WS_CONNECTION_CLOSED,
  }),
  wsGetMessage: (message: string): IWsGetMessageAction => ({
    type: EActionWs.WS_GET_MESSAGE,
    payload: message,
  }),
  wsSendMessage: (message: string): IWsSendMessageAction => ({
    type: EActionWs.WS_SEND_MESSAGE,
    payload: message,
  }),
  wsClose: (): IWsCloseAction => ({
    type: EActionWs.WS_CLOSE,
  }),
}
