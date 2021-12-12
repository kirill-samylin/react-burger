import {memo} from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import styles from './order-details.module.css';
import doneImg from '../../images/done.svg';
import PropTypes from "prop-types";
import {createPortal} from "react-dom";

const OrderDetails = memo(({onClose, isShow}) => {

  const modal = isShow ? (
    <ModalOverlay onClose={onClose}>
      <Modal onClose={onClose}>
        <div className={styles.modal}>
          <p className="text text_type_digits-large">034536</p>
          <p className="text text_type_main-medium mt-8">
            идентификатор заказа
          </p>
          <img className="mt-15 mb-15" src={doneImg} alt="готовится" />
          <p className="text text_type_main-default">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive mt-2 mb-20">
            Дождитесь готовности заказа на орбитальной станции
          </p>
        </div>
      </Modal>
    </ModalOverlay>
  ) : null;

  return createPortal(modal, document.body);
});

export default OrderDetails;

OrderDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  isShow: PropTypes.bool.isRequired,
};
