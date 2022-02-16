import {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import Layout from "layout/layout/layout";
import FormRegistration from "components/form-registation/form-registration";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import styles from "../registration/registration.module.css";
import {Link, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import {forgotPasswordRequest} from "services/api";
import {LocationState} from "../../types/types";
import {isContainRoute} from "../../services/breadcrumbs";
import {ERoutePath} from "../../constants/routes";

const ForgotPassword: FC = () => {
  const [data, setData] = useState({
    email: '',
  });
  const history = useHistory();
  const { state } = useLocation<LocationState>();
  const { url, path } = useRouteMatch();
  console.log({state})
  useEffect(
    () => {
      if (state && !isContainRoute(state, url)) {
        history.replace({ state: [...state, { path, url, title: 'Восстановление пароля' }] });
      }
    },
    [path, url, state, history]
  );
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    forgotPasswordRequest(data)
      .then(() => {
        history.push({
          pathname: ERoutePath.RESET_PASSWORD,
          state,
        });
      })
      .catch((err) => console.log(err));
  }, [history, data, state]);

  const handleChange = useCallback(({target}: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;
    setData({
      ...data,
      [name]: value,
    });
  }, [data]);

  return (
    <Layout>
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
          <Link className={cn("text text_type_main-default", styles.link)} to={ERoutePath.LOGIN}>Войти</Link>
        </div>
      </div>
    </Layout>
  )
}

export default ForgotPassword
