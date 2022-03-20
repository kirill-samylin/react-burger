import {FC, memo, useRef} from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';

import { TOrder } from 'types/order';
import styles from './order-list.module.css';
import {ingredientDetailsList } from 'store/ingredient/ingredient.selectors';
import { OrderItem } from './components';
import { useSelector } from 'store/hooks';

interface OrderListProps {
  orders: TOrder[];
  className?: string;
}

export const OrderList: FC<OrderListProps> = memo(({className, orders}) => {
  const {pathname} = useLocation();
  const ingredientsList = useSelector(ingredientDetailsList);
  const refListElement = useRef<HTMLUListElement | null>(null);
  const widthElement = refListElement.current?.offsetWidth || 0;
  const size = widthElement <= 600 ? 'small' : 'middle';

  return (
    <ul className={cn(styles.orders, "mt-9 custom-scroll", className, {
      [styles.indent_middle]: size === 'middle',
      [styles.indent_small]: size === 'small',
    })} ref={refListElement}>
      {orders.map((order) => (
        <OrderItem
          key={order._id}
          order={order}
          list={ingredientsList}
          size={size}
          pachName={pathname}
        />
      ))}
    </ul>
  )
});
