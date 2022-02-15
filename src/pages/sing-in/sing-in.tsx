import {ChangeEvent, useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import cn from 'classnames';

import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeader from "components/app-header/app-header";
import styles from './sing-in.module.css';
import FormRegistration from "components/form-registation/form-registration";
import {useDispatch} from "react-redux";
import {loginUser} from "store/user/uses.actions";

const SingIn = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const handleChange = useCallback(({target}: ChangeEvent<HTMLInputElement>) => {

    const {name, value} = target;
    setData({
      ...data,
      [name]: value,
    })
  }, [data]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(loginUser(data))
  }, [data, dispatch]);

  return (
    <>
      <AppHeader />
      <FormRegistration onSubmit={handleSubmit}>
        <p className="text text_type_main-medium">
          Вход
        </p>
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <PasswordInput name="password" value={data.password} onChange={handleChange} />
        <div>
          <Button type="primary" size="medium" htmlType="submit">Войти</Button>
        </div>
      </FormRegistration>
      <div className={styles.footer}>
        <div className={styles.paragraph}>
          <p className="text text_type_main-default text_color_inactive mr-1">Вы — новый пользователь?</p>
          <Link className={cn("text text_type_main-default", styles.link)} to="/register">Зарегистрироваться</Link>
        </div>
        <div className={cn(styles.paragraph, "mt-4")}>
          <p className="text text_type_main-default text_color_inactive mr-1">
            Забыли пароль?
          </p>
          <Link className={cn("text text_type_main-default", styles.link)} to="/forgot-password">Восстановить пароль</Link>
        </div>
      </div>
    </>
  );
}

export default SingIn;
