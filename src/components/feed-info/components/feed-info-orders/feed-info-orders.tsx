import { FC, memo } from "react";
import { TOrder } from "types/order";
import cn from 'classnames';

import styles from './feed-info-orders.module.css';

interface FeedInfoOrdersProps {
  list: TOrder[];
  color?: 'success';
}

export const FeedInfoOrders: FC<FeedInfoOrdersProps> = memo(({list, color}) => {
  return (
    <ul className={styles.list}>
      {list.map(({number}) => (
        <li key={number}>
          <p className={cn("text text_type_digits-default", {
            [styles.success]: color,
          })}>{number}</p>
        </li>
      ))}
    </ul>
  );
});
