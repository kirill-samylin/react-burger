import {FC} from "react";
import Header from "../header/header";
import {useSelector} from "react-redux";
import {isAppInitializedSelector} from "store/user/user.selectors";
import {Loader} from "components/loader/loader";
import styles from './layout.module.css';
import { isIngredientLoaded } from "store/ingredient/ingredient.selectors";

const Layout: FC = ({children}) => {
  const isAppInitialized = useSelector(isAppInitializedSelector);
  const isLoadedIngrediens = useSelector(isIngredientLoaded);
  return (
    <>
      <Header />
      {!isAppInitialized || !isLoadedIngrediens ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ): children}
    </>
  )
}

export default Layout
