import {Link, useHistory, useLocation} from "react-router-dom";
import cn from 'classnames';
import styles from './profile-orders.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useRouteMatch} from "react-router-dom";
import {LocationState} from "../../../../types/types";
import {useEffect} from "react";
import {isContainRoute} from "../../../../services/breadcrumbs";

const ingredientsUrl = [
  "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
  "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
  "https://code.s3.yandex.net/react/code/salad-mobile.png",
];

const ProfileOrders = () => {
  const history = useHistory();
  const { state } = useLocation<LocationState>();
  const { url, path } = useRouteMatch();
  console.log({ url, path })
  useEffect(
    () => {
      if (state && !isContainRoute(state, url)) {
        history.replace({ state: [...state, { path, url, title: 'История заказов' }] });
      }
    },
    [path, url, state, history]
  );
  return (
    <ul className={cn(styles.orders, "mt-9 'custom-scroll'")}>
      {new Array(10).fill(0).map((i, index) => (
        <Link className={styles.link} key={index} to={`${path}/${index}`}>
          <li className={cn(styles.order, "p-6")}>
            <div className={styles.header}>
              <p className="text text_type_digits-default">#123456</p>
              <p className="text text_type_main-default text_color_inactive">
                Сегодня, 16:20 i-GMT+3
              </p>
            </div>
            <p className="text text_type_main-medium mt-6">Interstellar бургер</p>
            <p className="text text_type_main-default mt-2">Готовится</p>
            <div className={cn(styles.footer, "mt-7")}>
              <ul className={styles.ingredients}>
                {ingredientsUrl.map((value) => (
                  <li key={value} className={styles.ingredient}>
                    <img className={styles.image} src={value} alt="Ингредиент" />
                  </li>
                ))}
              </ul>
              <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">423</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default ProfileOrders;
