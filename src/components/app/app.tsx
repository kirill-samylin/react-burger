import Main from "pages/main/main";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import SingIn from "pages/sing-in/sing-in";
import Registration from "pages/registration/registration";
import ForgotPassword from "pages/forgot-password/forgot-password";
import ResetPassword from "pages/reset-password/reset-password";
import Profile from "pages/profile/profile";
import {useSelector} from "react-redux";
import {isAppInitializedSelector} from "store/user/user.selectors";
import {FC} from "react";
import {PrivateRoute} from "components/private-route/private-route";
import {PublicRoute} from "../public-route/public-route";

const App: FC = () => {
  const isAppInitialized = useSelector(isAppInitializedSelector);
  if (!isAppInitialized) {
    return <div>Loading</div>;
  }
  return (
    <Router>
      <Switch>
        <PublicRoute component={SingIn} path="/login" redirectTo="/" />
        <PublicRoute component={Registration} path="/register" redirectTo="/" />
        <PublicRoute component={ForgotPassword} path="/forgot-password" redirectTo="/" />
        <PublicRoute component={ResetPassword} path="/reset-password" redirectTo="/" />
        <PrivateRoute component={Profile} path="/profile" redirectTo="/login" />
        <PrivateRoute component={Main} path="/" redirectTo="/login" />
      </Switch>
    </Router>
  );
};

export default App;
