import {FC} from "react";
import Header from "../header/header";
import {useSelector} from "react-redux";
import {isAppInitializedSelector} from "../../store/user/user.selectors";
import {Loader} from "../../components/loader/loader";
import styles from './layout.module.css';

const Layout: FC = ({children}) => {
  const isAppInitialized = useSelector(isAppInitializedSelector);

  return (
    <>
      <Header />
      {!isAppInitialized ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ): children}
    </>
  )
}

export default Layout
