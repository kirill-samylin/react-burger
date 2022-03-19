import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {FC, useCallback} from "react";
import {BurgerConstructorIngredient} from "./components";
import {Types} from "constants/types";
import { userSelector } from "store/user/user.selectors";
import { useHistory } from "react-router-dom";
import { ERoutePath } from "constants/routes";
import { createOrder } from "store/order/order.middleware";
import {ingredientOrderListSelector, isOrderRequestSelector } from "store/order/order.selectors";
import { IIngredient } from "types/burger-ingredient";
import { orderActions } from "store/order/order.actions";

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleOpenOrderDetailsPopup = useCallback((ids) => {
    dispatch(createOrder(ids));
  }, [dispatch]);
  const ingredients = useSelector(ingredientOrderListSelector);
  const isRequest = useSelector(isOrderRequestSelector);
  const bunItem = ingredients.length && ingredients[0].type === 'bun' ? ingredients[0] : null;
  const sum = ingredients.reduce((sum, {price, type}) => sum+(price * (type === 'bun' ? 2 : 1)), 0);
  const isAuth = useSelector(userSelector);

  const [, dropTarget] = useDrop({
    accept: Types.INGREDIENT,
    drop(ingredient) {
      dispatch(orderActions.addIngredient(ingredient as IIngredient));
    }
  });
  const handleSubmit = useCallback(() => {
    if (!isAuth) {
      history.push(ERoutePath.LOGIN);
    } else {
      handleOpenOrderDetailsPopup(ingredients.map((item) => item._id));
    }
  }, [ingredients, handleOpenOrderDetailsPopup, isAuth, history]);

  const handleDelete = useCallback((id) => {
    dispatch(orderActions.cleanIngredient(id));
  }, [dispatch]);

  const handleMove = useCallback((dragIndex, hoverIndex) => {
    dispatch(orderActions.moveIngredient({
      dragIndex,
      hoverIndex,
    }));
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
          {ingredients.map((ingredient, index) => {
            if (bunItem && !index) return null;
            return (
              <BurgerConstructorIngredient
                key={ingredient.id}
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
        <Button type="primary" size="large" onClick={handleSubmit} disabled={isRequest || !ingredients.find(({type}) => type === 'bun')}>
          {isRequest ? 'Загрузка...' : 'Оформить заказ'}
        </Button>
      </div>
    </section>
  );
}
