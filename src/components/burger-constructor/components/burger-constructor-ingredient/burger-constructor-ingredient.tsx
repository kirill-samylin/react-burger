import styles from "./burger-constructor-ingredient.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC, useRef} from "react";
import {IBurgerIngredient} from "types/burger-ingredient";
import {useSort} from "hooks/useSort";

interface BurgerConstructorIngredientProps {
  ingredient: IBurgerIngredient;
  index: number;
  onDelete: (id: number) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

export const BurgerConstructorIngredient: FC<BurgerConstructorIngredientProps> = (
  {
    ingredient,
    index,
    onDelete,
    onMove
  }
) => {
  const ref = useRef(null);
  const {name, image, price, id} = ingredient;
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
