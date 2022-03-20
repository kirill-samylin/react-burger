import { useEffect } from "react";
import {Switch, useHistory, useLocation} from "react-router-dom";
import styles from './profile.module.css';
import ProfileNav from "./components/profile-nav/profile-nav";
import ProfileEdit from "./components/profile-edit/profile-edit";
import ProfileOrders from "./components/profile-orders/profile-orders";
import {PrivateRoute} from "components/private-route/private-route";
import Layout from "layout/layout/layout";
import {ERoutePath} from "constants/routes";
import { FeedDetails } from "components/feed-details";
import { LocationState } from "types/location";
import Modal from "components/modal/modal";
import { useDispatch } from "store/hooks";
import { getCookie } from "utils/cookie/cookie";
import { WS_URL } from "constants/api";
import { webSocketActions } from "store/websocket/websocket.actions";
import { useCurrentOrder } from "hooks/useCurrentOrder";


const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation<LocationState>();
  const order = useCurrentOrder();
  const isModal = !!state?.length;
  useEffect(() => {
    const accessToken: string = (getCookie('accessToken') || '').replace('Bearer ', '');
    dispatch(
      webSocketActions.wsConnectionStart(`${WS_URL}?token=${accessToken}`)
    );
    return () => {
      dispatch(webSocketActions.wsConnectionClosed());
    }
  }, [dispatch]);
  return (
    <Layout>
      <section className={styles.profile}>
        {isModal && <ProfileNav />}
        <Switch>
          <PrivateRoute path={ERoutePath.PROFILE} redirectTo={ERoutePath.LOGIN} component={ProfileEdit} exact />
          <PrivateRoute render={() => isModal ? (
            <>
              <ProfileOrders />
              {order && (
                <Modal onClose={() => history.goBack()} title={order.number} typeTitle="number">
                  <FeedDetails order={order} isTitle={false} />
                </Modal>
              )}
            </>
          ) : order ? <FeedDetails order={order} /> : null}
            path={[ERoutePath.PROFILE_ORDERS, ERoutePath.PROFILE_ORDERS_ID]}
            redirectTo={ERoutePath.LOGIN}
            exact
          />
          <PrivateRoute path={ERoutePath.PROFILE_ORDERS_ID} redirectTo={ERoutePath.LOGIN} component={FeedDetails} exact />
        </Switch>
      </section>
    </Layout>
  );
};

export default Profile;
