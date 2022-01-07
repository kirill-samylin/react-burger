import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import {useCallback, useEffect, useState} from "react";
import {
  CLEAR_INGREDIENT_DETAILS_MODAL,
  getIngredients,
} from "../../services/actions/ingredient";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

const App = () => {
  const dispatch = useDispatch();
  const {ingredientDetails, isShowIngredientDetails} = useSelector(state => state.ingredient);
  const [orderDetailsPopup, setOrderDetailsPopup] = useState(false);

  const handleCloseOrderDetailsPopup = useCallback(() => setOrderDetailsPopup(false), []);
  const handleOpenOrderDetailsPopup = useCallback(() => setOrderDetailsPopup(true), []);

  const handleCloseIngredientDetailsPopup = useCallback(() => dispatch({
    type: CLEAR_INGREDIENT_DETAILS_MODAL,
  }), [dispatch]);

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor onSubmit={handleOpenOrderDetailsPopup} />
        </DndProvider>
      </main>
      {orderDetailsPopup && <OrderDetails onClose={handleCloseOrderDetailsPopup} isShow={orderDetailsPopup} />}
      {isShowIngredientDetails && (
        <IngredientDetails
          onClose={handleCloseIngredientDetailsPopup}
          ingredient={ingredientDetails}
        />
      )}
    </div>
  );
};
export default App;
