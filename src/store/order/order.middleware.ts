import { Dispatch } from "redux";
import { createOrderRequest } from "services/api";
import { orderActions } from "./order.actions";

export function createOrder(ids: string[]) {
  return function(dispatch: Dispatch) {
    dispatch(orderActions.createOrderRequest());
    createOrderRequest(ids)
      .then(({order, name}) => dispatch(orderActions.createOrderSuccess({
        ...order,
        name
      })))
      .catch(() =>  dispatch(orderActions.createOrderFailed()));
  };
}
