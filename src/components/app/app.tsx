import {FC} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SingIn from "pages/sing-in/sing-in";
import Registration from "pages/registration/registration";
import ForgotPassword from "pages/forgot-password/forgot-password";
import ResetPassword from "pages/reset-password/reset-password";
import Profile from "pages/profile/profile";
import NotFount from "pages/not-fount/not-fount";
import {PrivateRoute} from "components/private-route/private-route";
import {PublicRoute} from "components/public-route/public-route";
import Home from "pages/home/home";
import {ERoutePath} from "constants/routes";

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute component={SingIn} path={ERoutePath.LOGIN} redirectTo={ERoutePath.HOME} />
        <PublicRoute component={Registration} path={ERoutePath.REGISTER} redirectTo={ERoutePath.HOME} />
        <PublicRoute component={ForgotPassword} path="/forgot-password" redirectTo={ERoutePath.HOME} />
        <PublicRoute component={ResetPassword} path="/reset-password" redirectTo={ERoutePath.HOME} />
        <PrivateRoute component={Profile} path={[ERoutePath.PROFILE, ERoutePath.PROFILE_ORDERS]} redirectTo={ERoutePath.LOGIN} exact />
        <Route component={Home} path={[ERoutePath.HOME, ERoutePath.INGREDIENT_ID]} exact />
        <Route component={NotFount} />
      </Switch>
    </Router>
  );
};

export default App;
