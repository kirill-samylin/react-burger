import styles from './modal.module.css';
import cn from "classnames";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "components/modal-overlay/modal-overlay";
import {FC, useCallback, useEffect} from "react";
import {createPortal} from "react-dom";

interface ModalProps {
  title?: string;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({children, title = '', onClose}) => {

  const handleKeydownClose = useCallback(({key, keyCode}) => {
    if (key === 'Escape' || keyCode === 27) {
      onClose()
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydownClose);
    return () =>  document.removeEventListener('keydown', handleKeydownClose);
  }, [handleKeydownClose]);

  return createPortal((
    <ModalOverlay onClose={onClose}>
      <div className={cn('p-10', styles.modal)}>
        <div className={styles.header}>
          <p className="text text_type_main-large">{title}</p>
          <button className={styles.button} onClick={() => onClose()}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </ModalOverlay>
  ), document.getElementById('modal') as HTMLDivElement);
};

export default Modal;
