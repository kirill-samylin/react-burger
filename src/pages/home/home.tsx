import {FC, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, useHistory, useLocation} from "react-router-dom";
import {LocationState} from "types/location";
import Layout from "layout/layout/layout";
import Modal from "components/modal/modal";
import IngredientDetails from "components/ingredient-details/ingredient-details";
import OrderDetails from "components/order-details/order-details";
import {ERoutePath} from "constants/routes";
import styles from './home.module.css';
import { Constructor } from "components/constructor";
import { isShowOrderDetailsSelector } from "store/order/order.selectors";
import { orderActions } from "store/order/order.actions";

const Home: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isShowOrderDetails = useSelector(isShowOrderDetailsSelector);
  const { state } = useLocation<LocationState>();
  const isModal = !!state?.length;
  const handleCloseOrderDetailsPopup = useCallback(() =>
    dispatch(orderActions.hideDetailsOrderModal()), [dispatch]);

  return (
    <Layout>
      <Route path={ERoutePath.HOME} component={Constructor} exact />
      <Route render={() => isModal ? (
        <>
          <Constructor />
          <Modal onClose={() => history.goBack()} title="Детали ингредиента">
            <IngredientDetails />
          </Modal>
        </>
      ) : (
        <IngredientDetails className={styles.details} isTitle />
      )} path={ERoutePath.INGREDIENT_ID} exact />

      {isShowOrderDetails && (
        <Modal onClose={handleCloseOrderDetailsPopup}>
          <OrderDetails />
        </Modal>
      )}
    </Layout>
  );
}

export default Home;
