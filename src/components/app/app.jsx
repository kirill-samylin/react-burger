import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import {useCallback, useEffect, useState} from "react";
import {getIngredients} from "../../utils/api";
import {url} from "../../constants/api";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [orderDetailsPopup, setOrderDetailsPopup] = useState(false);
  const [ingredientDetailsPopup, setIngredientDetailsPopup] = useState({
    isShow: false,
    ingredient: {},
  });

  const handleCloseOrderDetailsPopup = useCallback(() => setOrderDetailsPopup(false), []);
  const handleOpenOrderDetailsPopup = useCallback(() => setOrderDetailsPopup(true), []);

  const handleSelectIngredient = useCallback((ingredient) => setIngredientDetailsPopup({
    isShow: true,
    ingredient,
  }), []);

  const handleCloseIngredientDetailsPopup = useCallback(() => setIngredientDetailsPopup({
    isShow: false,
    ingredient: {},
  }), [])

  useEffect(() => {
    getIngredients(url)
      .then((ingredients) => setIngredients(ingredients))
      .catch((err) => console.log(err))
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} onSelect={handleSelectIngredient} />
        <BurgerConstructor ingredients={ingredients} onSubmit={handleOpenOrderDetailsPopup} />
      </main>
      <OrderDetails onClose={handleCloseOrderDetailsPopup} isShow={orderDetailsPopup} />
      <IngredientDetails onClose={handleCloseIngredientDetailsPopup} {...ingredientDetailsPopup} />
    </div>
  );
};
export default App;
