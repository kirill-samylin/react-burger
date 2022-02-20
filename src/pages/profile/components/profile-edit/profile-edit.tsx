import {useSelector} from "react-redux";
import {FC, useCallback, useEffect, useState} from "react";
import cn from "classnames";
import styles from "../../profile.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {userSelector} from "store/user/user.selectors";
import {TUser} from "store/user/user.types";
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";
import {LocationState} from "../../../../types/types";
import {isContainRoute} from "../../../../services/breadcrumbs";

const ProfileEdit: FC = () => {
  const {name = '', email = ''} = useSelector(userSelector) || {};
  const [data, setData] = useState<TUser>({name, email, password: 'ffff'});
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const history = useHistory();
  const { state } = useLocation<LocationState>();
  const { url, path } = useRouteMatch();

  useEffect(
    () => {
      if (state && !isContainRoute(state, url)) {
        history.replace({ state: [...state, { path, url, title: 'Профиль' }] });
      }
    },
    [path, url, state, history]
  );

  const handleChange = useCallback(({target}) => {
    const {name, value} = target;
    setData({
      ...data,
      [name]: value,
    })
  }, [data]);

  const handleEdit = useCallback(() => {
    setData({
      ...data,
      password: '',
    });
    setIsEdit(true);
  }, [data]);

  const handleCancel = useCallback(() => {
    setData({name, email, password: 'ffff'});
    setIsEdit(false);
  }, [email, name]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(data)
  }, [data]);
  return (
    <form className={cn(styles.form, "ml-15")} onSubmit={handleSubmit}>
      <Input
        name="name"
        type="text"
        placeholder="Имя"
        disabled={!isEdit}
        icon="EditIcon"
        value={data.name}
        onChange={handleChange}
        onIconClick={handleEdit}
      />
      <Input
        name="email"
        type="email"
        placeholder="Логин"
        disabled={!isEdit}
        icon="EditIcon"
        value={data.email}
        onChange={handleChange}
        onIconClick={handleEdit}
      />
      <Input
        name="password"
        type="password"
        placeholder="Пароль"
        disabled={!isEdit}
        icon="EditIcon"
        value={data.password || ''}
        onChange={handleChange}
        onIconClick={handleEdit}
      />
      <div className={styles.footer}>
        <Button type="secondary" size="medium" onClick={handleCancel} disabled={!isEdit}>Отмена</Button>
        <Button type="primary" size="medium" htmlType="submit" disabled={!isEdit}>Сохранить</Button>
      </div>
    </form>
  );
};

export default ProfileEdit;
