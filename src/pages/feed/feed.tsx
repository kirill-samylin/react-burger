import { FC, useEffect } from "react";
import {Switch, Route, useHistory, useLocation} from "react-router-dom";

import Layout from "layout/layout/layout";
import { useDispatch } from "store/hooks";
import { webSocketActions } from "store/websocket/websocket.actions";
import { WS_URL } from "constants/api";
import { OrderFeed } from "components/order-feed";
import { ERoutePath } from "constants/routes";
import { FeedDetails } from "components/feed-details";
import { LocationState } from "types/location";
import Modal from "components/modal/modal";
import { useCurrentOrder } from "hooks/useCurrentOrder";

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation<LocationState>();
  const isModal = !!state?.length;
  const order = useCurrentOrder();
  useEffect(() => {
    dispatch(webSocketActions.wsConnectionStart(`${WS_URL}/all`));
  }, [dispatch]);
  return (
    <Layout>
      <Switch>
        <Route render={() => isModal ? (
          <>
            <OrderFeed />
            {order && (
              <Modal onClose={() => history.goBack()} title={order.number} typeTitle="number">
                <FeedDetails order={order} isTitle={false} />
              </Modal>
            )}
          </>
        ) : order ? <FeedDetails order={order} /> : null
        } path={[ERoutePath.FEED, ERoutePath.FEED_ID]} exact />
      </Switch>
    </Layout>
  )
}
