import {FC} from "react";
import {Redirect, Route, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelector} from "store/user/user.selectors";
import {PrivateRouteProps} from "./private-route.types";
import {LocationState} from "../../types/types";

export const PrivateRoute: FC<PrivateRouteProps> = ({redirectTo, ...props}) => {
  const user = useSelector(userSelector);
  const { state } = useLocation<LocationState>();

  if (!user) {
    return <Redirect to={{
      pathname: redirectTo,
      state
    }} />
  }
  return <Route {...props} />
}
