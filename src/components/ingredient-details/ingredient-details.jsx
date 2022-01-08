import styles from './ingredient-details.module.css';
import cn from "classnames";
import {useSelector} from "react-redux";

const IngredientDetails = () => {
  const {image, name, fat, calories, carbohydrates, proteins} = useSelector(state => state.ingredient.ingredientDetails);
  return (
    <div className={styles.modal}>
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
