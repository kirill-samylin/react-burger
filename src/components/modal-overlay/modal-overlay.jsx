import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = ({children, onClose}) => {
  const handleClose = ({target}) => {
    if (target.classList.contains(styles.overlay)) {
      onClose();
    }
  };
  return (
    <div className={styles.overlay} onClick={handleClose}>
      {children}
    </div>
  );
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
