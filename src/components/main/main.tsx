import styles from './main.module.css';
import BurgerIngredients from "components/burger-ingredients/burger-ingredients";
import {useCallback} from "react";

import {createOrder} from "store/ingredient/ingredient.actions";

import BurgerConstructor from "components/burger-constructor/burger-constructor";
import {useDispatch} from "react-redux";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

const Main = () => {
  const dispatch = useDispatch();
  const handleOpenOrderDetailsPopup = useCallback((ids) => {
    dispatch(createOrder(ids));
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor onSubmit={handleOpenOrderDetailsPopup} />
      </DndProvider>
    </main>
  );
};

export default Main;
