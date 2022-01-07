import PropTypes from "prop-types";
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT} from "services/actions/ingredient";
import {useCallback} from "react";
import {BurgerConstructorIngredient} from "./components";
import {Types} from "constants/types";

const BurgerConstructor = ({onSubmit}) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.ingredient.burgerIngredient);
  const bunItem = ingredients.length && ingredients[0].type === 'bun' ? ingredients[0] : null;
  const sum = ingredients.reduce((sum, {price}) => price+sum, 0);

  const [, dropTarget] = useDrop({
    accept: Types.INGREDIENT,
    drop(ingredient) {
      dispatch({
        type: ADD_INGREDIENT,
        ingredient,
      });
    }
  });

  const handleDelete = useCallback((id) => {
    dispatch({
      type: DELETE_INGREDIENT,
      id,
    });
  }, [dispatch]);

  const handleMove = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_INGREDIENT,
      move: {
        dragIndex,
        hoverIndex,
      },
    });
  }, [dispatch])

  return (
    <section className="pr-4 pr-4 mt-25" ref={dropTarget}>
      {bunItem && (
        <div className="ml-8">
          <ConstructorElement
            type="top"
            text={bunItem.name + ` (верх)`}
            price={bunItem.price}
            isLocked={true}
            thumbnail={bunItem.image}
          />
        </div>
      )}
      {ingredients && ingredients.length ?
        <ul className={cn('custom-scroll', styles.components)}>
          {ingredients.map(({id, ...ingredient}, index) => {
            if (bunItem && !index) return null;
            return (
              <BurgerConstructorIngredient
                key={id}
                id={id}
                index={index}
                ingredient={ingredient}
                onDelete={handleDelete}
                onMove={handleMove}
              />
            )
          })}
        </ul> :
        <div className={styles.empty}>
          <p className="text text_type_main-default text_color_inactive">
            Перенесите нужные ингредиенты для бургера.
          </p>
        </div>
      }
      {bunItem && (
        <div className="ml-8">
          <ConstructorElement
            type="bottom"
            text={bunItem.name + ` (низ)`}
            price={bunItem.price}
            isLocked={true}
            thumbnail={bunItem.image}
          />
        </div>
      )}
      <div className={cn('mr-4 mt-10', styles.constructor__footer)}>
        <div className={cn('mr-10', styles.sum)}>
          <p className="text text_type_digits-medium mr-2">{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={onSubmit}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
