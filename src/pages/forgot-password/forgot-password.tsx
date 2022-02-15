import {ChangeEvent, FC, useCallback, useState} from "react";
import AppHeader from "components/app-header/app-header";
import FormRegistration from "components/form-registation/form-registration";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import styles from "../registration/registration.module.css";
import {Link, useHistory} from "react-router-dom";
import {forgotPasswordRequest} from "services/api";

const ForgotPassword: FC = () => {
  const [data, setData] = useState({
    email: '',
  });
  const history = useHistory();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    forgotPasswordRequest(data)
      .then(() => {
        history.push('/reset-password');
      })
      .catch((err) => console.log(err));
  }, [history, data]);

  const handleChange = useCallback(({target}: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;
    setData({
      ...data,
      [name]: value,
    });
  }, [data]);

  return (
    <>
      <AppHeader />
      <FormRegistration onSubmit={handleSubmit}>
        <p className="text text_type_main-medium">
          Восстановление пароля
        </p>
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={data.email}
        />
        <div>
          <Button type="primary" size="medium" htmlType="submit">Восстановить</Button>
        </div>
      </FormRegistration>
      <div className={cn(styles.footer, "mt-20")}>
        <div className={styles.paragraph}>
          <p className="text text_type_main-default text_color_inactive mr-1">Вспомнили пароль?</p>
          <Link className={cn("text text_type_main-default", styles.link)} to="/login">Войти</Link>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
