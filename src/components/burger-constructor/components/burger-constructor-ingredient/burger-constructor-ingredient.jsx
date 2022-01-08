import styles from "./burger-constructor-ingredient.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useRef} from "react";
import PropTypes, {number} from "prop-types";
import {burgerIngredientType} from "types/burger-ingredient";
import {useSort} from "hooks/useSort";

export const BurgerConstructorIngredient = ({ingredient, id, index, onDelete, onMove}) => {
  const ref = useRef(null);
  const {name, image, price} = ingredient;
  const {opacity, handlerId} = useSort(ref, index, id, onMove);

  return (
    <li className={styles.ingredient} ref={ref} data-handler-id={handlerId} style={{opacity}}>
      <button className={styles.button} type="button">
        <DragIcon type="primary"/>
      </button>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => onDelete(id)}
      />
    </li>
  )
}

BurgerConstructorIngredient.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  ingredient: burgerIngredientType.isRequired,
  id: PropTypes.number.isRequired,
  index: number.isRequired,
};
