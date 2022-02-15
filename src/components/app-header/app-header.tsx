import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import cn from 'classnames';
import {NavLink} from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={cn(styles.header)}>
      <div className={cn('pb-4 pt-4', styles.header__content)}>
        <nav className={styles.menu}>
          <NavLink activeClassName={styles.active} className={cn(styles.link, "text_color_inactive")} to="/">
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default pl-2">
              Конструктор
            </p>
          </NavLink>
          <NavLink activeClassName={styles.active} className={cn(styles.link, "text_color_inactive")} to="/orders">
            <ListIcon type="secondary" />
            <p className="text text_type_main-default pl-2">
              Лента заказов
            </p>
          </NavLink>
        </nav>
        <Logo />
        <NavLink activeClassName={styles.active} className={cn(styles.link, "text_color_inactive")} to="/profile">
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default pl-2">
            Личный кабинет
          </p>
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;
