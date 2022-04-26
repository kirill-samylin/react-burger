import { FC, memo, useMemo } from "react";
import {TOrder } from "types/order";
import { filterOrdersByStatus } from "utils/order";
import { FeedInfoOrders, FeedInfoScoreboard } from "./components";
import styles from './feed-info.module.css';

interface FeedInfoProps {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

export const FeedInfo: FC<FeedInfoProps> = memo(({orders, total, totalToday}) => {
  const ordersDone = useMemo(() => filterOrdersByStatus(orders, 'done'), [orders]);
  const ordersPending = useMemo(() => filterOrdersByStatus(orders, 'pending'), [orders]);
  return (
    <div className={styles.block}>
      <div className={styles.info}>
        <div>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <FeedInfoOrders list={ordersDone} color="success" />
        </div>
        <div>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <FeedInfoOrders list={ordersPending} />
        </div>
      </div>
      <FeedInfoScoreboard total={total} label="Выполнено за все время:"/>
      <FeedInfoScoreboard total={totalToday} label="Выполнено за сегодня:"/>
    </div>
  );
});
