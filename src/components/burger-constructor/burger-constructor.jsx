import PropTypes from "prop-types";
import {burgerIngredientType} from "../../types/burger-ingredient";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import cn from "classnames";

const BurgerConstructor = ({ingredients, onSubmit}) => {
  const bunItem = ingredients.length ? ingredients[0] : null;
  return (
    <section className="pr-4 pr-4 mt-25">
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
      <ul className={cn('custom-scroll', styles.components)}>
        {ingredients && ingredients.filter(({type}) => type !== 'bun').map(({name, _id, image, price}, index) => {
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
