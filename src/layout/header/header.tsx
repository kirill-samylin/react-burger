import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './header.module.css';
import cn from 'classnames';
import {NavLink, useRouteMatch} from "react-router-dom";
import {ERoutePath} from "constants/routes";

export const Header = () => {
  const {path} = useRouteMatch();

  return (
    <header className={cn(styles.header)}>
      <div className={cn('pb-4 pt-4', styles.header__content)}>
        <nav className={styles.menu}>
          <NavLink
            activeClassName={styles.active}
            className={cn(styles.link, "text_color_inactive")}
            to={ERoutePath.HOME}
            exact
          >
            <BurgerIcon type={path === ERoutePath.HOME ? "primary" : "secondary"} />
            <p className="text text_type_main-default pl-2">
              Конструктор
            </p>
          </NavLink>
          <NavLink activeClassName={styles.active} className={cn(styles.link, "text_color_inactive")}
             to={{
               pathname: ERoutePath.FEED,
               state: [{path: ERoutePath.FEED, url: ERoutePath.FEED, title: 'Лента заказов'}]
             }}
          >
            <ListIcon type={path.startsWith(ERoutePath.FEED) ? "primary" : "secondary"} />
            <p className="text text_type_main-default pl-2">
              Лента заказов
            </p>
          </NavLink>
        </nav>
        <Logo />
        <NavLink activeClassName={styles.active} className={cn(styles.link, "text_color_inactive")} to={{
          pathname: ERoutePath.PROFILE,
          state: [{path: '/profile', url: '/profile', title: 'Профиль', isRedirect: true}]
        }}>
          <ProfileIcon type={path.startsWith(ERoutePath.PROFILE) ? "primary" : "secondary"} />
          <p className="text text_type_main-default pl-2">
            Личный кабинет
          </p>
        </NavLink>
      </div>
    </header>
  );
};