import {useHistory, useLocation} from "react-router-dom";
import styles from './profile-orders.module.css';
import {useRouteMatch} from "react-router-dom";
import {LocationState} from "types/location";
import {useEffect} from "react";
import {isContainRoute} from "services/breadcrumbs";
import { OrderList } from "components/order-list";
import { useSelector } from "store/hooks";
import { orderFeedSelector } from "store/order/order.selectors";

const ProfileOrders = () => {
  const history = useHistory();
  const { state } = useLocation<LocationState>();
  const { url, path } = useRouteMatch();
  const {orders = []} = useSelector(orderFeedSelector);

  useEffect(
    () => {
      if (state && !isContainRoute(state, url)) {
        history.replace({ state: [...state, { path, url, title: 'История заказов' }] });
      }
    },
    [path, url, state, history]
  );

  return (
    <OrderList className={styles.orders} orders={orders} />
  );
};

export default ProfileOrders;
