import styles from './main.module.css';
import AppHeader from "components/app-header/app-header";
import BurgerIngredients from "components/burger-ingredients/burger-ingredients";
import {useCallback, useEffect} from "react";

import {
  createOrder,
  getIngredients,
  ingredientActions,
} from "store/ingredient/ingredient.actions";

import BurgerConstructor from "components/burger-constructor/burger-constructor";
import OrderDetails from "components/order-details/order-details";
import IngredientDetails from "components/ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import Modal from "components/modal/modal";
import {isShowSelector} from "store/ingredient/ingredient.selectors";

const Main = () => {
  const dispatch = useDispatch();
  const {isShowIngredientDetails, isShowOrderDetails} = useSelector(isShowSelector);

  const handleCloseOrderDetailsPopup = useCallback(() =>
    dispatch(ingredientActions.hideDetailsOrderModal()), [dispatch]);

  const handleOpenOrderDetailsPopup = useCallback((ids) => {
    dispatch(createOrder(ids));
  }, [dispatch]);

  const handleCloseIngredientDetailsPopup = useCallback(() =>
    dispatch(ingredientActions.cleanIngredientDetailsModal()), [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
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
    </>
  );
};

export default Main;
