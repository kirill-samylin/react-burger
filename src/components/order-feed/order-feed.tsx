import { FC } from "react";

import { Main } from "components/main";
import { OrderList } from "components/order-list";
import { useSelector } from "store/hooks";
import { orderFeedSelector } from "store/order/order.selectors";
import { FeedInfo } from "components/feed-info";

export const OrderFeed: FC = () => {
  const {orders, total, totalToday} = useSelector(orderFeedSelector);
  return (
    <Main title="Лента заказов">
      <OrderList orders={orders} />
      <FeedInfo totalToday={totalToday} total={total} orders={orders} />
    </Main>
  );
}
