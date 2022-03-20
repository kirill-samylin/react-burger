import {NavLink} from "react-router-dom";
import cn from "classnames";
import styles from "./profile-nav.module.css";
import {useCallback} from "react";
import {logout} from "store/user/uses.actions";
import {ERoutePath} from "constants/routes";
import { useDispatch } from "store/hooks";

const ProfileNav = () => {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink
            activeClassName={styles.active}
            className={cn("text text_type_main-medium text_color_inactive", styles.link)}
            to={{
              pathname: ERoutePath.PROFILE,
              state: [{
                isRedirect: true,
                path: "/profile",
                title: "Профиль",
                url: "/profile",
              }],
            }}
            exact
          >
            Профиль
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            activeClassName={styles.active}
            className={cn("text text_type_main-medium text_color_inactive", styles.link)}
            to={{
              pathname: ERoutePath.PROFILE_ORDERS,
              state: [{
                isRedirect: true,
                path: "/profile/orders",
                title: "История заказов",
                url: "/profile/orders",
              }],
            }}
            exact
          >
            История заказов
          </NavLink>
        </li>
        <li className={styles.item}>
          <p
            className={cn("text text_type_main-medium text_color_inactive", styles.link)}
            onClick={handleLogout}
          >
            Выход
          </p>
        </li>
      </ul>
      <p className={cn("text text_type_main-default text_color_inactive mt-20", styles.paragraph)}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
}

export default ProfileNav;
