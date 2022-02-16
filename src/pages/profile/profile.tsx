import {Switch} from "react-router-dom";
import styles from './profile.module.css';
import ProfileNav from "./components/profile-nav/profile-nav";
import ProfileEdit from "./components/profile-edit/profile-edit";
import ProfileOrders from "./components/profile-orders/profile-orders";
import {PrivateRoute} from "components/private-route/private-route";
import Layout from "layout/layout/layout";
import {ERoutePath} from "constants/routes";

const Profile = () => {
  return (
    <Layout>
      <section className={styles.profile}>
        <ProfileNav />
        <Switch>
          <PrivateRoute path={ERoutePath.PROFILE} redirectTo={ERoutePath.LOGIN} component={ProfileEdit} exact />
          <PrivateRoute path={ERoutePath.PROFILE_ORDERS} redirectTo={ERoutePath.LOGIN} component={ProfileOrders} exact />
        </Switch>
      </section>
    </Layout>
  );
};

export default Profile;
