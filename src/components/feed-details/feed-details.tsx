import { FC, useMemo } from "react";
import moment from "moment";
import cn from 'classnames';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientAvatar } from "components/uiComponents";
import { orderStatus } from "constants/order";
import { useSelector } from "store/hooks";
import { ingredientDetailsList } from "store/ingredient/ingredient.selectors";

import { getIngredientSortList, sumAllIngredients } from "utils/ingredient";

import styles from './feed-details.module.css';
import { TOrder } from "types/order";

interface FeedDetailsProps {
  isTitle?: boolean;
  order: TOrder;
}

export const FeedDetails: FC<FeedDetailsProps> = ({isTitle = true, order}) => {
  const {ingredients, name, status, number, createdAt} = order;
  const ingredientInfo = useSelector(ingredientDetailsList);
  const list = useMemo(() => getIngredientSortList(ingredientInfo, ingredients), [ingredientInfo, ingredients]);
  const sum = useMemo(() => sumAllIngredients(list), [list]);
  return (
    <div className={styles.details}>
      {isTitle && <p className={cn("text text_type_digits-default mt-30", styles.number)}>#{number}</p>}
      <p className="text text_type_main-medium mt-10">{name}</p>
      <p className="text text_type_main-default mt-3">{orderStatus[status]}</p>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <ul className={cn(styles.list, "mt-6 mb-10 mr-6 custom-scroll")}>
        {list.map((ingredient, index) => (
          <li key={index} className={styles.item}>
            <IngredientAvatar src={ingredient.image} />
            <p className="text text_type_main-default">{ingredient.name}</p>
            <div className={styles.price}>
              <p className="text text_type_digits-default">{ingredient.count} x {ingredient.price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive"> {`${moment(createdAt).calendar()} i-GMT+3`}</p>
        <div className={styles.price}>
          <p className="text text_type_digits-default">{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
