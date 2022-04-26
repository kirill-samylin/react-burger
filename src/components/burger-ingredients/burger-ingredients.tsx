import {useCallback} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientTypes} from "./burger-ingredients.constants";
import cn from "classnames";

import {ingredientActions} from "store/ingredient/ingredient.actions";
import {useScrollTabs} from "hooks/useScrollTabs";
import {BurgerIngredient} from "./components/burger-ingredient";
import {ingredientStateSelector} from "../../store/ingredient/ingredient.selectors";
import {useHistory} from "react-router-dom";
import { ingredientOrderListSelector } from "store/order/order.selectors";
import {useDispatch, useSelector } from "store/hooks";

export const BurgerIngredients = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {currentTabIngredients: currentTab, ingredients} = useSelector(ingredientStateSelector);
  const burgerIngredient = useSelector(ingredientOrderListSelector);
  
  const handleSwitchTab = useCallback((currentTabIngredients) =>
    dispatch(ingredientActions.tabSwitchIngredients(currentTabIngredients)
  ), [dispatch]);

  const [viewRef, onChangeTab] = useScrollTabs(handleSwitchTab);

  return (
    <section>
      <nav className={styles.tabs}>
        {ingredientTypes.map(({name, value}) => (
          <Tab key={value} value={value} active={currentTab === value} onClick={() => onChangeTab(value)}>
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
                  <BurgerIngredient
                    key={ingredient._id}
                    ingredients={burgerIngredient}
                    ingredient={ingredient}
                    onSelect={() => history.push({
                      pathname: `/ingredient/${ingredient._id}`,
                      state: [{ path: `/ingredient/${ingredient._id}`, url: `/ingredient/${ingredient._id}`, title: ingredient.name}]
                    })}
                  />
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};
