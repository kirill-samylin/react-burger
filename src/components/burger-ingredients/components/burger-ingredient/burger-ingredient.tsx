import cn from "classnames";
import styles from "./burger-ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "types/burger-ingredient";
import {useDrag} from "react-dnd";
import {Types} from "constants/types";
import {FC} from "react";

interface BurgerIngredientProps {
  ingredients: IIngredient[];
  ingredient: IIngredient;
  onSelect: (ingredient: IIngredient) => void;
}

export const BurgerIngredient: FC<BurgerIngredientProps> = ({ingredients, ingredient, onSelect}) => {
  const {_id, image, price, name, type} = ingredient;
  const isBun = type === 'bun';
  const count = ingredients.filter((item) => item._id === _id).length || false;
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
