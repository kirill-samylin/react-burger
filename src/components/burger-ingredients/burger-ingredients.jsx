import {memo, useState} from "react";
import styles from './burger-ingredients.module.css';
import {CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientTypes} from "./burger-ingredients.constants";
import cn from "classnames";
import PropTypes from "prop-types";

import {burgerIngredientType} from "../../types/burger-ingredient";

const BurgerIngredients = memo(({ingredients, onSelect}) => {
  const [current, setCurrent] = useState('bun');
  return (
    <section>
      <h2 className="text text_type_main-large mt-10 mb-5">Собери бургер</h2>
      <nav className={styles.tabs}>
        {ingredientTypes.map(({name, value}) => (
          <Tab key={value} value={value} active={current === value} onClick={setCurrent}>
            {name}
          </Tab>
        ))}
      </nav>
      <ul className={cn('custom-scroll', styles.ingredients__list)}>
        {ingredientTypes.map(({name, value}) => (
          <li key={value} className={cn('mt-10', styles.ingredients__item)}>
            <p className="text text_type_main-medium mb-6">{name}</p>
            <ul className={cn('pl-4 pr-2', styles.cards)}>
              {ingredients && ingredients.filter((ingredient) => value === ingredient.type).map((ingredient) => {
                const {_id, image, price, name} = ingredient;
                return (
                  <li key={_id} className={styles.card} onClick={() => onSelect(ingredient)}>
                    <img className={cn('pl-4 pr-4', styles.image)} src={image} alt={name} />
                    <div className={styles.price}>
                      <p className="text text_type_digits-default mr-2">{price}</p>
                      <CurrencyIcon type="primary" />
                    </div>
                    <p className="text text_type_main-default mt-1">{name}</p>
                  </li>
               )
              })}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
});

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(burgerIngredientType.isRequired).isRequired,
  onSelect: PropTypes.func,
};
