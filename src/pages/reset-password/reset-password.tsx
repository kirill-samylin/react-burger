import {useCallback} from "react";
import FormRegistration from "components/form-registation/form-registration";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import styles from "../registration/registration.module.css";
import {Link, useHistory, useLocation} from "react-router-dom";
import Layout from "layout/layout/layout";
import {LocationState} from "types/location";
import {ERoutePath} from "constants/routes";
import { useForm } from "hooks/useForm";
import { TResetPasswordValues } from "types/user";

const ResetPassword = () => {
  const {values, handleChange} = useForm<TResetPasswordValues>();

  const history = useHistory();
  const { state } = useLocation<LocationState>();

  if (!state?.length || state[state.length - 1].path !== ERoutePath.FORGOT_PASSWORD) {
    history.push({
      pathname: ERoutePath.LOGIN,
      state
    });
  }
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    history.push(ERoutePath.LOGIN);
  }, [history]);

  return (
    <Layout>
      <FormRegistration onSubmit={handleSubmit}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input
          placeholder="Введите новый пароль"
          type="password"
          icon="CurrencyIcon"
          value={values.password}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          value={values.code}
          onChange={handleChange}
        />
        <div>
          <Button type="primary" size="medium" htmlType="submit">Сохранить</Button>
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

export default ResetPassword;
