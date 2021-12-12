import PropTypes from "prop-types";
import {burgerIngredientType} from "../../types/burger-ingredient";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import cn from "classnames";

const BurgerConstructor = ({ingredients, onSubmit}) => {
  const firstItem = ingredients.length ? ingredients[0] : null;
  const lastItem = ingredients.length > 1 ? ingredients[ingredients.length - 1] : null;
  return (
    <section className="pr-4 pr-4 mt-25">
      {firstItem && (
        <div className="ml-8">
          <ConstructorElement
            type="top"
            text={firstItem.name + ` (верх)`}
            price={firstItem.price}
            isLocked={true}
            thumbnail={firstItem.image}
          />
        </div>
      )}
      <ul className={cn('custom-scroll', styles.components)}>
        {ingredients && ingredients.map(({name, _id, image, price}, index) => {
          const isFirst = index === 0;
          const isLast = index === ingredients.length-1;
          if (isFirst || isLast) return null;
          return (
            <li key={_id} className={styles.component}>
              <button className={styles.button} type="button">
                <DragIcon type="primary" />
              </button>
              <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
              />
            </li>
          )
        })}
      </ul>
      {lastItem && (
        <div className="ml-8">
          <ConstructorElement
            type="bottom"
            text={lastItem.name + ` (низ)`}
            price={lastItem.price}
            isLocked={true}
            thumbnail={lastItem.image}
          />
        </div>
      )}
      <div className={cn('mr-4 mt-10', styles.constructor__footer)}>
        <div className={cn('mr-10', styles.sum)}>
          <p className="text text_type_digits-medium mr-2">610</p>
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
  ingredients: PropTypes.arrayOf(burgerIngredientType.isRequired).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
