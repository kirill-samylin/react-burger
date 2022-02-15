import {useState, useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';
import cn from 'classnames';

import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeader from "components/app-header/app-header";
import styles from './registration.module.css';
import FormRegistration from "components/form-registation/form-registration";
import {registerRequest} from "services/api";

const Registration = () => {
  const history = useHistory();
  const [data, setData] = useState({
    name: '',
    password: '',
    email: '',
  });
  const handleChange = useCallback((e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }, [data]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    registerRequest(data)
      .then(() => history.push('/login'))
      .catch((err) => console.log(err));
  }, [data, history]);
  // {
  //   "success": true,
  //   "user": {
  //   "email": "kirill23sm@ya.ru",
  //     "name": "QIWI CARD"
  // },
  //   "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjRmMTdlNmQ3Y2Q4MDAxYjJkMmQ5OCIsImlhdCI6MTY0MzQ0MjU1OCwiZXhwIjoxNjQzNDQzNzU4fQ.wTeIKdtV9i8m6jJdMKTrB7J9By4gg2uh2fLPdwx0Qq4",
  //   "refreshToken": "c16f9c79b78c5995d072908d76f35a0ca76006f3883165c0fd187b49892db96056d3fa0ec30347e1"
  // }
  return (
    <>
      <AppHeader />
      <FormRegistration onSubmit={handleSubmit}>
        <p className="text text_type_main-medium">
          Регистрация
        </p>
        <Input
          name="name"
          type="text"
          placeholder="Имя"
          value={data.name}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          value={data.email}
          onChange={handleChange}
        />
        <PasswordInput name="password" value={data.password} onChange={handleChange} />
        <div>
          <Button type="primary" size="medium" htmlType="submit">Зарегистрироваться</Button>
        </div>
      </FormRegistration>
      <div className={cn(styles.footer, "mt-20")}>
        <div className={styles.paragraph}>
          <p className="text text_type_main-default text_color_inactive mr-1">Уже зарегистрированы?</p>
          <Link className={cn("text text_type_main-default", styles.link)} to="/login">Войти</Link>
        </div>
      </div>
    </>
  );
}

export default Registration;
