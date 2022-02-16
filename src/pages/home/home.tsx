import {FC, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, useHistory, useLocation} from "react-router-dom";
import {isShowSelector} from "store/ingredient/ingredient.selectors";
import {LocationState} from "types/types";
import {ingredientActions} from "store/ingredient/ingredient.actions";
import Layout from "layout/layout/layout";
import Modal from "components/modal/modal";
import IngredientDetails from "components/ingredient-details/ingredient-details";
import OrderDetails from "components/order-details/order-details";
import Main from "components/main/main";
import {ERoutePath} from "constants/routes";
import styles from './home.module.css';

const Home: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {isShowOrderDetails} = useSelector(isShowSelector);
  const { state } = useLocation<LocationState>();
  const isModal = !!state?.length;
  const handleCloseOrderDetailsPopup = useCallback(() =>
    dispatch(ingredientActions.hideDetailsOrderModal()), [dispatch]);

  return (
    <Layout>
      <Route path={ERoutePath.HOME} component={Main} exact />
      <Route render={() => isModal ? (
        <>
          <Main />
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
