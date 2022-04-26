import {FC, useCallback, useEffect} from "react";
import Layout from "layout/layout/layout";
import FormRegistration from "components/form-registation/form-registration";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import styles from "../registration/registration.module.css";
import {Link, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import {api} from "services/api";
import {LocationState} from "types/location";
import {isContainRoute} from "services/breadcrumbs";
import {ERoutePath} from "constants/routes";
import { useForm } from "hooks/useForm";
import { TEmail } from "types/user";

const ForgotPassword: FC = () => {
  const {values, handleChange} = useForm<TEmail>();
  const history = useHistory();
  const { state } = useLocation<LocationState>();
  const { url, path } = useRouteMatch();
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
    api.forgotPassword(values)
      .then(() => {
        history.push({
          pathname: ERoutePath.RESET_PASSWORD,
          state,
        });
      })
      .catch((err) => console.log(err));
  }, [history, values, state]);

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
          value={values.email || ''}
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
