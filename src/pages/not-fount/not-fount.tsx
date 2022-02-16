import {FC} from "react";
import {useHistory} from "react-router-dom"
import styles from './not-fount.module.css';
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

const NotFount: FC = () => {
  const history = useHistory();
  return (
    <div className={styles.block}>
      <p className="text text_type_main-large">
        404 Not fount
      </p>
      <p className="text text_type_main-medium mt-5">
        Страница не найдена
      </p>
      <Button type="secondary" size="large" onClick={() => history.goBack()}>Назад</Button>
    </div>
  );
}

export default NotFount;
