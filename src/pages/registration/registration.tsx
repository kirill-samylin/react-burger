import {useCallback, useEffect} from 'react';
import {Link, useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import cn from 'classnames';

import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";

import Layout from "layout/layout/layout";
import styles from './registration.module.css';
import FormRegistration from "components/form-registation/form-registration";
import {api} from "services/api";
import {LocationState} from "types/location";
import {isContainRoute} from "services/breadcrumbs";
import {ERoutePath} from "constants/routes";
import { useForm } from 'hooks/useForm';
import { TRegistrationValues } from 'types/user';

const Registration = () => {
  const {values, handleChange} = useForm<TRegistrationValues>();
  const history = useHistory();
  const { state } = useLocation<LocationState>();
  const { url, path } = useRouteMatch();
  useEffect(
    () => {
      if (state && !isContainRoute(state, url)) {
        history.replace({ state: [...state, { path, url, title: 'Регистрация' }] });
      }
    },
    [path, url, state, history]
  );

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    api.register(values)
      .then(() => history.push(ERoutePath.LOGIN))
      .catch((err) => console.log(err));
  }, [values, history]);

  return (
    <Layout>
      <FormRegistration onSubmit={handleSubmit}>
        <p className="text text_type_main-medium">
          Регистрация
        </p>
        <Input
          name="name"
          type="text"
          placeholder="Имя"
          value={values.name || ''}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          value={values.email || ''}
          onChange={handleChange}
        />
        <PasswordInput name="password" value={values.password} onChange={handleChange} />
        <div>
          <Button type="primary" size="medium" htmlType="submit">Зарегистрироваться</Button>
        </div>
      </FormRegistration>
      <div className={cn(styles.footer, "mt-20")}>
        <div className={styles.paragraph}>
          <p className="text text_type_main-default text_color_inactive mr-1">Уже зарегистрированы?</p>
          <Link className={cn("text text_type_main-default", styles.link)} to={ERoutePath.LOGIN}>Войти</Link>
        </div>
      </div>
    </Layout>
  );
}

export default Registration;
