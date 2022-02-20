import styles from './ingredient-details.module.css';
import cn from "classnames";
import {useSelector} from "react-redux";
import {FC} from "react";
import {getIngredientSelector} from "store/ingredient/ingredient.selectors";
import {useParams} from "react-router";
import {useHistory} from "react-router-dom";
import {ERoutePath} from "constants/routes";
import {IngredientDetailsProps} from "./ingredient-details.types";

const IngredientDetails: FC<IngredientDetailsProps> = ({className, isTitle = false}) => {
  const history = useHistory();
  const { id } = useParams<{id : string}>();
  const {image, name, fat, calories, carbohydrates, proteins} = useSelector(getIngredientSelector(id)) || {};

  if (!name) {
    history.push(ERoutePath.NOT_FOUNT);
  }

  return (
    <div className={cn(className, styles.modal)}>
      {isTitle && <p className="text text_type_main-large">Детали ингредиента</p>}
      <img className={cn('pl-5 pr-5', styles.image)} src={image} alt={name} />
      <p className="text text_type_main-medium mt-4 mb-8">
        {name}
      </p>
      <ul className={styles.nutritional}>
        <li className={styles.nutritionalItem}>
          <p className="text text_type_main-default">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default">{calories}</p>
        </li>
        <li>
          <p className="text text_type_main-default">
            Белки, г
          </p>
          <p className="text text_type_digits-default">{proteins}</p>
        </li>
        <li>
          <p className="text text_type_main-default">
            Жиры, г
          </p>
          <p className="text text_type_digits-default">{fat}</p>
        </li>
        <li>
          <p className="text text_type_main-default">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default">{carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
