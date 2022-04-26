import {TOrderStatus, TOrder } from "types/order";

export const filterOrdersByStatus = (orders: TOrder[] = [], status: TOrderStatus, limit = 6): TOrder[] => orders
  .filter((order) => order.status === status)
  .filter((order, i) => i < limit);
