import {ChangeEvent, useCallback, useState} from "react";
import AppHeader from "components/app-header/app-header";
import FormRegistration from "components/form-registation/form-registration";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import styles from "../registration/registration.module.css";
import {Link, useHistory} from "react-router-dom";

const ResetPassword = () => {
  const history = useHistory();
  const [data, setData] = useState({
    password: '',
    code: '',
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    history.push('/login');
    console.log(data)
  }, [history, data]);

  const handleChange = useCallback(({target}: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;
    setData({
      ...data,
      [name]: value,
    })
  }, [data]);

  return (
    <>
      <AppHeader />
      <FormRegistration onSubmit={handleSubmit}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input
          placeholder="Введите новый пароль"
          type="password"
          icon="CurrencyIcon"
          value={data.password}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          value={data.code}
          onChange={handleChange}
        />
        <div>
          <Button type="primary" size="medium" htmlType="submit">Сохранить</Button>
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

export default ResetPassword;
