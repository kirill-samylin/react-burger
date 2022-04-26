import { useParams } from "react-router-dom";
import { useSelector } from "store/hooks";
import { orderListSelector } from "store/order/order.selectors";
import { TOrder } from "types/order";

export const useCurrentOrder = (): TOrder | undefined => {
  const { id } = useParams<{id : string}>();
  const orders = useSelector(orderListSelector);
  return orders.find(({_id}) => _id === id);
}
