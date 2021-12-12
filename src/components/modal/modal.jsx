import styles from './modal.module.css';
import cn from "classnames";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Modal = ({children, title, onClose}) => {
  return (
    <div className={cn('p-10', styles.modal)}>
      <div className={styles.header}>
        <p className="text text_type_main-large">{title || ''}</p>
        <button className={styles.button} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
      </div>
      {children}
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
