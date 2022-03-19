import { AppState } from "store/types";
import {IBurgerIngredient } from "types/burger-ingredient";
import { TOrder } from "types/order";
import { TOrderFeedSelector } from "./order.types";

export const isOrderRequestSelector = (state: AppState): boolean => !!state.order.orderDetailsRequest;
export const orderDetailsSelector = (state: AppState) => state.order.orderDetails;
export const orderListSelector = (state: AppState): TOrder[] => state.order.orders || [];
export const isShowOrderDetailsSelector = (state: AppState): boolean => state.order.isShowOrderDetails;

export const ingredientOrderListSelector = (state: AppState): IBurgerIngredient[] => state.order.burgerIngredient;

export const orderFeedSelector = ({order}: AppState): TOrderFeedSelector => ({
  total: order.total,
  totalToday: order.totalToday,
  orders: order.orders,
});
