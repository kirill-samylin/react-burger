import cn from 'classnames';
import styles from './profile-orders.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const ProfileOrders = () => {
  return (
    <ul className={cn(styles.orders, "mt-9 'custom-scroll'")}>
      {new Array(10).fill(0).map((i, index) => (
        <li key={index} className={cn(styles.order, "p-6")}>
          <div className={styles.header}>
            <p className="text text_type_digits-default">#123456</p>
            <p className="text text_type_main-default text_color_inactive">
              Сегодня, 16:20 i-GMT+3
            </p>
          </div>
          <p className="text text_type_main-medium mt-6">Interstellar бургер</p>
          <p className="text text_type_main-default mt-2">Готовится</p>
          <div className={cn(styles.footer, "mt-7")}>
            <div className={styles.price}>
              <p className="text text_type_digits-default mr-2">423</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProfileOrders;
