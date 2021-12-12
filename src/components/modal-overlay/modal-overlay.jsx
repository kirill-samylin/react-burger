import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";
import {useCallback, useEffect} from "react";

const ModalOverlay = ({children, onClose}) => {

  const handleKeydownClose = useCallback(({key, keyCode}) => {
     if (key === 'Escape' || keyCode === 27) {
       onClose()
     }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydownClose);
    return () =>  document.removeEventListener('keydown', handleKeydownClose);
  }, [handleKeydownClose]);

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
