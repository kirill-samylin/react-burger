import styles from './modal-overlay.module.css';
import {FC, FormHTMLAttributes} from "react";

interface ModalOverlayProps extends FormHTMLAttributes<HTMLFormElement> {
  onClose: () => void;
}

const ModalOverlay: FC<ModalOverlayProps> = ({children, onClose}) => {
  const handleClose = (target: EventTarget) => {
    const element = target as HTMLElement;
    if (element && element.classList.contains(styles.overlay)) {
      onClose();
    }
  };
  return (
    <div className={styles.overlay} onClick={(e) => handleClose(e.target)}>
      {children}
    </div>
  );
};

export default ModalOverlay;
