import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {Link, useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import cn from 'classnames';

import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './login.module.css';
import FormRegistration from "components/form-registation/form-registration";
import {useDispatch} from "react-redux";
import {loginUser} from "store/user/uses.actions";
import Layout from "layout/layout/layout";
import {isContainRoute} from "services/breadcrumbs";
import {LocationState} from "types/types";
import {ERoutePath} from "constants/routes";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation<LocationState>();
  const { url, path } = useRouteMatch();
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

  useEffect(
    () => {
      if (!state || !isContainRoute(state, url)) {
        history.replace({ state: [...(state || []), { path, url, title: 'Авторизация' }] });
      }
    },
    [path, url, state, history]
  );

  return (
    <Layout>
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
          <Link className={cn("text text_type_main-default", styles.link)} to={ERoutePath.REGISTER}>Зарегистрироваться</Link>
        </div>
        <div className={cn(styles.paragraph, "mt-4")}>
          <p className="text text_type_main-default text_color_inactive mr-1">
            Забыли пароль?
          </p>
          <Link className={cn("text text_type_main-default", styles.link)} to={{
            pathname: ERoutePath.FORGOT_PASSWORD,
            state,
          }}>Восстановить пароль</Link>
        </div>
      </div>
    </Layout>
  );
}

export default Login;