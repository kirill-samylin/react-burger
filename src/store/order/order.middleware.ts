import { createOrderRequest } from "services/api";
import { AppDispatch, AppThunk } from "store/types";
import { orderActions } from "./order.actions";

export const createOrder: AppThunk = (ids: string[]) => {
  return function(dispatch: AppDispatch) {
    dispatch(orderActions.createOrderRequest());
    createOrderRequest(ids)
      .then(({order, name}) => dispatch(orderActions.createOrderSuccess({
        ...order,
        name
      })))
      .catch(() =>  dispatch(orderActions.createOrderFailed()));
  };
}
