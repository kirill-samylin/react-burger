import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import {useCallback, useEffect} from "react";

import {
  CLEAR_INGREDIENT_DETAILS_MODAL,
  HIDE_DETAILS_ORDER_MODAL,
  createOrder,
  getIngredients,
} from "services/actions/ingredient";

import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import Modal from "../modal/modal";

const App = () => {
  const dispatch = useDispatch();
  const {isShowIngredientDetails, isShowOrderDetails} = useSelector(state => state.ingredient);

  const handleCloseOrderDetailsPopup = useCallback(() => dispatch({
    type: HIDE_DETAILS_ORDER_MODAL,
  }), [dispatch]);

  const handleOpenOrderDetailsPopup = useCallback((ids) => {
    dispatch(createOrder(ids));
  }, [dispatch]);

  const handleCloseIngredientDetailsPopup = useCallback(() => dispatch({
    type: CLEAR_INGREDIENT_DETAILS_MODAL,
  }), [dispatch]);

  useEffect(() => dispatch(getIngredients()), [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor onSubmit={handleOpenOrderDetailsPopup} />
        </DndProvider>
      </main>
      {isShowOrderDetails && (
        <Modal onClose={handleCloseOrderDetailsPopup}>
          <OrderDetails />
        </Modal>
      )}
      {isShowIngredientDetails && (
        <Modal onClose={handleCloseIngredientDetailsPopup} title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
};
export default App;
