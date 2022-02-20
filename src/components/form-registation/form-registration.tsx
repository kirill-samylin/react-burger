import styles from './form-registration.module.css';
import {FC, FormHTMLAttributes} from "react";

const FormRegistration: FC<FormHTMLAttributes<HTMLFormElement>> = ({children, ...props}) => {
  return (
    <form className={styles.form}  autoComplete="off" {...props}>
      {children}
    </form>
  );
}

export default FormRegistration;
