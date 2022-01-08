import {useCallback} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientTypes} from "./burger-ingredients.constants";
import cn from "classnames";

import {useDispatch, useSelector} from "react-redux";
import {SET_INGREDIENT_DETAILS_MODAL, TAB_SWITCH_INGREDIENTS} from "../../services/actions/ingredient";
import {useScrollTabs} from "../../hooks/useScrollTabs";
import {BurgerIngredient} from "./components/burger-ingredient";

const BurgerIngredients = () => {
  const {currentTabIngredients, ingredients} = useSelector(state => state.ingredient);
  const dispatch = useDispatch();
  const handleSwitchTab = useCallback((value) => dispatch(
    {
      type: TAB_SWITCH_INGREDIENTS,
      currentTabIngredients: value,
    }
  ), [dispatch]);

  const [viewRef, onChangeTab] = useScrollTabs(handleSwitchTab);

  const handleSelectIngredient = useCallback((ingredient) => dispatch({
    type: SET_INGREDIENT_DETAILS_MODAL,
    ingredient,
  }), [dispatch]);

  return (
    <section>
      <h2 className="text text_type_main-large mt-10 mb-5">Собери бургер</h2>
      <nav className={styles.tabs}>
        {ingredientTypes.map(({name, value}) => (
          <Tab key={value} value={value} active={currentTabIngredients === value} onClick={() => onChangeTab(value)}>
            {name}
          </Tab>
        ))}
      </nav>
      <ul className={cn('custom-scroll', styles.ingredients__list)} ref={viewRef}>
        {ingredientTypes.map(({name, value}) => (
          <li data-type="tab-item" key={value} className={cn('pt-10', styles.ingredients__item)} id={value}>
            <p className="text text_type_main-medium mb-6">{name}</p>
            <ul className={cn('pl-4 pr-2', styles.cards)}>
              {ingredients && ingredients
                .filter((ingredient) => value === ingredient.type)
                .map((ingredient) => (
                  <BurgerIngredient key={ingredient._id} ingredient={ingredient} onSelect={handleSelectIngredient} />
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BurgerIngredients;
