import styles from './order-details.module.css';
import doneImg from '../../images/done.svg';
import {useSelector} from "react-redux";

const OrderDetails = () => {
  const {number} = useSelector(state => state.ingredient.orderDetails);
  return (
    <div className={styles.modal}>
      <p className="text text_type_digits-large">{number}</p>
      <p className="text text_type_main-medium mt-8">
        идентификатор заказа
      </p>
      <img className="mt-15 mb-15" src={doneImg} alt="готовится" />
      <p className="text text_type_main-default">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-20">
        Дождитесь готовности заказа на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
