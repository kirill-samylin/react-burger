import AppHeader from "components/app-header/app-header";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import styles from './profile.module.css';
import ProfileNav from "./components/profile-nav/profile-nav";
import ProfileEdit from "./components/profile-edit/profile-edit";
import ProfileOrders from "./components/profile-orders/profile-orders";

const Profile = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <AppHeader />
      <section className={styles.profile}>
        <ProfileNav />
        <Switch>
          <Route path={`${path}`} component={ProfileEdit} exact />
          <Route path={`${path}/orders`} component={ProfileOrders} exact />
        </Switch>
      </section>
    </>
  );
};

export default Profile;
