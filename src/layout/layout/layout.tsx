import {FC} from "react";
import {Header} from "../header";
import {useSelector} from "react-redux";
import {Loader} from "components/loader/loader";
import styles from './layout.module.css';
import { isLoadingPageSelector } from "store/selectors";

const Layout: FC = ({children}) => {
  const isLoading = useSelector(isLoadingPageSelector);
  return (
    <>
      <Header />
      {isLoading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ): children}
    </>
  )
}

export default Layout
