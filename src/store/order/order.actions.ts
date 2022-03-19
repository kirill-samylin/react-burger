import { IIngredient, TMove } from "types/burger-ingredient";
import { TOrderDetails } from "types/order";
import { TResponseWs } from "./order.types";

export enum EActionOrder {
  WS_GET_ORDERS = 'WS_GET_ORDERS',
  WS_ERROR_ORDERS = 'WS_ERROR_ORDERS',
  WS_SET_ORDERS = 'WS_SET_ORDERS',
  CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST',
  CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED',
  ADD_INGREDIENT = 'ADD_INGREDIENT',
  DELETE_INGREDIENT = 'DELETE_INGREDIENT',
  MOVE_INGREDIENT = 'MOVE_INGREDIENT',
  HIDE_DETAILS_ORDER_MODAL = 'HIDE_DETAILS_ORDER_MODAL',
}

export interface ISetOrders {
  readonly type: typeof EActionOrder.WS_SET_ORDERS;
  readonly payload: TResponseWs;
}

export interface ICreateOrderRequest {
  readonly type: typeof EActionOrder.CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccess {
  readonly type: typeof EActionOrder.CREATE_ORDER_SUCCESS;
  readonly payload: TOrderDetails;
}

export interface ICreateOrderFailed {
  readonly type: typeof EActionOrder.CREATE_ORDER_FAILED;
}

export interface IHideDetailsOrderModal {
  readonly type: typeof EActionOrder.HIDE_DETAILS_ORDER_MODAL;
}

export interface IAddIngredient {
  readonly type: typeof EActionOrder.ADD_INGREDIENT;
  readonly payload: IIngredient;
}

export interface ICleanIngredient {
  readonly type: typeof EActionOrder.DELETE_INGREDIENT;
  readonly payload: number;
}

export interface IMoveIngredient {
  readonly type: typeof EActionOrder.MOVE_INGREDIENT;
  readonly payload: TMove;
}

export interface IGetOrders {
  readonly type: typeof EActionOrder.WS_GET_ORDERS;
}

export interface IErrorOrders {
  readonly type: typeof EActionOrder.WS_ERROR_ORDERS;
  readonly payload: Event;
}

export const orderActions = {
  getOrders: (): IGetOrders => ({
    type: EActionOrder.WS_GET_ORDERS,
  }),
  setOrders: (payload: TResponseWs): ISetOrders => ({
    type: EActionOrder.WS_SET_ORDERS,
    payload,
  }),
  errorOrders: (payload: Event): IErrorOrders => ({
    type: EActionOrder.WS_ERROR_ORDERS,
    payload,
  }),
  createOrderRequest: (): ICreateOrderRequest => ({
    type: EActionOrder.CREATE_ORDER_REQUEST,
  }),
  createOrderSuccess: (payload: TOrderDetails): ICreateOrderSuccess => ({
    type: EActionOrder.CREATE_ORDER_SUCCESS,
    payload,
  }),
  createOrderFailed: (): ICreateOrderFailed => ({
    type: EActionOrder.CREATE_ORDER_FAILED,
  }),
  addIngredient: (payload: IIngredient): IAddIngredient => ({
    type: EActionOrder.ADD_INGREDIENT,
    payload,
  }),
  cleanIngredient: (payload: number): ICleanIngredient => ({
    type: EActionOrder.DELETE_INGREDIENT,
    payload
  }),
  moveIngredient: (payload: TMove): IMoveIngredient => ({
    type: EActionOrder.MOVE_INGREDIENT,
    payload
  }),
  hideDetailsOrderModal: (): IHideDetailsOrderModal => ({
    type: EActionOrder.HIDE_DETAILS_ORDER_MODAL
  }),
}
