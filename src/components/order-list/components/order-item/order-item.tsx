import { FC, memo, useMemo } from "react"
import moment from 'moment';
import 'moment/locale/ru';
import cn from 'classnames';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { Link } from "react-router-dom";
import { TOrder } from "types/order";
import styles from './order-item.module.css';
import { TIngredientsItems } from "types/burger-ingredient";
import { IngredientAvatar } from "components/uiComponents";

interface OrderItemProps {
  order: TOrder;
  list: TIngredientsItems;
  size: 'middle' | 'small' | 'big';
  pachName: string;
}

export const OrderItem: FC<OrderItemProps> = memo(({order, list, size, pachName}) => {
  const {_id, createdAt, ingredients, number} = order;
  const sum = useMemo<number>(() =>
    ingredients.reduce((cost, id) => cost+=list[id]?.price || 0, 0), [ingredients, list]);
  const ingredientsList = useMemo(() => ingredients.filter((id, i) => i < 5 && id), [ingredients]);
  const lastIngredient = useMemo(() => {
    if (ingredients.length > 5) {
      const count = ingredients.length - 5;
      const {image, name} = list[ingredients[ingredients.length - count]] || {};
      const isMoreSix = count > 1;
      return <IngredientAvatar className={styles.indent} src={image} alt={name} isLast={isMoreSix} count={isMoreSix ? count: 0} />;
    }
    return null;
  }, [ingredients, list]);

  return (
    <Link className={styles.link} key={_id}
          to={{
            pathname: `${pachName}/${_id}`,
            state: [{
              isRedirect: true,
              path: pachName,
              title: "Информация о заказе",
              url: pachName,
            }],
          }}>
      <li className={cn(styles.order, "p-6")}>
        <div className={styles.header}>
          <p className="text text_type_digits-default">#{number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {`${moment(createdAt).calendar()} i-GMT+3`}
          </p>
        </div>
        <p className="text text_type_main-medium mt-6">Interstellar бургер</p>
        <p className={cn("text text_type_main-default mt-2", {
          [styles.hidden]: size === 'small',
        })}>Готовится</p>
        <div className={cn(styles.footer, "mt-7")}>
          <ul className={styles.ingredients}>
            {ingredientsList.map((id, i) => {
              const {image, name} = list[id];
              return <IngredientAvatar className={styles.indent} key={i} zIndex={ingredients.length - i} src={image} alt={name} />;
            })}
            {lastIngredient}
          </ul>
          <div className={styles.price}>
            <p className="text text_type_digits-default mr-2">{sum}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    </Link>
  );
});
