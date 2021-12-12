import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import cn from 'classnames';

const AppHeader = () => {
  return (
    <header className={cn(styles.header)}>
      <div className={cn('pb-4 pt-4', styles.header__content)}>
        <nav className={styles.menu}>
          <button className={cn(styles.button, styles.active)} type="button">
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default pl-2">
              Конструктор
            </p>
          </button>
          <button className={cn(styles.button, "text_color_inactive")} type="button">
            <ListIcon type="secondary" />
            <p className="text text_type_main-default pl-2">
              Лента заказов
            </p>
          </button>
        </nav>
        <Logo />
        <button className={cn(styles.button, "text_color_inactive")} type="button">
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default pl-2">
            Личный кабинет
          </p>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
