import cn from "classnames";
import styles from "./burger-ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {burgerIngredientType} from "../../../../types/burger-ingredient";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";
import {Types} from "constants/types";

export const BurgerIngredient = ({ingredient, onSelect}) => {
  const ingredients = useSelector(state => state.ingredient.burgerIngredient);
  const {_id, image, price, name, type} = ingredient;
  const isBun = type === 'bun';
  const count = ingredients.filter((item) => item._id === _id).length || null;
  const [{ opacity }, ref] = useDrag({
    type: Types.INGREDIENT,
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <li className={styles.card} onClick={() => onSelect(ingredient)} ref={ref} style={{ opacity }}>
      {count && <Counter count={isBun ? count + 1 : count} size="default" />}
      <img className={cn('pl-4 pr-4', styles.image)} src={image} alt={name} />
      <div className={styles.price}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default mt-1">{name}</p>
    </li>
  );
};

BurgerIngredient.propTypes = {
  ingredient: burgerIngredientType.isRequired,
  onSelect: PropTypes.func,
}
