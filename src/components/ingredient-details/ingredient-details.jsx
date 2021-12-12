import {memo} from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import styles from './ingredient-details.module.css';
import PropTypes from "prop-types";
import {createPortal} from "react-dom";
import cn from "classnames";

const IngredientDetails = memo(({onClose, isShow, ingredient}) => {
  const {image, name, fat, calories, carbohydrates, proteins} = ingredient;
  const modal = isShow ? (
    <ModalOverlay onClose={onClose}>
      <Modal onClose={onClose} title="Детали ингредиента">
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
      </Modal>
    </ModalOverlay>
  ) : null;

  return createPortal(modal, document.body);
});

export default IngredientDetails;

IngredientDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  isShow: PropTypes.bool.isRequired,
  ingredient: PropTypes.object,
};
