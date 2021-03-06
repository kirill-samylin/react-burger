import {FC} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Registration from "pages/registration/registration";
import ForgotPassword from "pages/forgot-password/forgot-password";
import ResetPassword from "pages/reset-password/reset-password";
import Profile from "pages/profile/profile";
import NotFount from "pages/not-fount/not-fount";
import {PrivateRoute} from "components/private-route/private-route";
import {PublicRoute} from "components/public-route/public-route";
import Home from "pages/home/home";
import {ERoutePath} from "constants/routes";
import Login from "pages/login/login";
import { Feed } from "pages/feed/feed";
import { useSelector } from "store/hooks";
import { isInitSelector } from "store/user/user.selectors";
import { Loader } from "components/loader/loader";

const App: FC = () => {
  const isInit = useSelector(isInitSelector);

  if (!isInit) {
    return <Loader />
  }

  return (
    <Router>
      <Switch>
        <PublicRoute component={Login} path={ERoutePath.LOGIN} redirectTo={ERoutePath.HOME} />
        <PublicRoute component={Registration} path={ERoutePath.REGISTER} redirectTo={ERoutePath.HOME} />
        <PublicRoute component={ForgotPassword} path={ERoutePath.FORGOT_PASSWORD} redirectTo={ERoutePath.HOME} />
        <PublicRoute component={ResetPassword} path={ERoutePath.RESET_PASSWORD} redirectTo={ERoutePath.HOME} />
        <PrivateRoute component={Profile} path={[ERoutePath.PROFILE, ERoutePath.PROFILE_ORDERS, ERoutePath.PROFILE_ORDERS_ID]} redirectTo={ERoutePath.LOGIN} exact />
        <Route component={Home} path={[ERoutePath.HOME, ERoutePath.INGREDIENT_ID]} exact />
        <Route component={Feed} path={[ERoutePath.FEED, ERoutePath.FEED_ID]} exact />
        <Route component={NotFount} />
      </Switch>
    </Router>
  );
};

export default App;
