import { IBurgerIngredient } from "types/burger-ingredient";
import { TOrder, TOrderDetails } from "types/order";
import {
  IAddIngredient,
  ICleanIngredient,
  ICreateOrderFailed,
  ICreateOrderRequest,
  ICreateOrderSuccess,
  IErrorOrders,
  IGetOrders,
  IHideDetailsOrderModal,
  IMoveIngredient,
  ISetOrders
} from "./order.actions";

export type TResponseWs =  {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TOrderState = {
  ordersLoading: boolean;
  ordersFailed: boolean;
  orders: TOrder[];
  error: Event | null;
  total: number;
  totalToday: number;
  orderDetailsRequest: boolean;
  orderDetailsFailed: boolean;
  orderDetails: TOrderDetails;
  burgerIngredient: IBurgerIngredient[];
  isShowOrderDetails: boolean;
};

export type TOrderActions =
  IGetOrders |
  ISetOrders |
  IErrorOrders |
  ICreateOrderRequest |
  ICreateOrderSuccess |
  ICreateOrderFailed |
  IAddIngredient |
  ICleanIngredient |
  IMoveIngredient |
  IHideDetailsOrderModal;

export type TOrderFeedSelector = {
  total: number;
  totalToday: number;
  orders: TOrder[];
}
