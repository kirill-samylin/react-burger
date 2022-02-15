import {FC} from "react";
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelector} from "store/user/user.selectors";
import {PrivateRouteProps} from "./private-route.types";

export const PrivateRoute: FC<PrivateRouteProps> = ({redirectTo, ...props}) => {
  const user = useSelector(userSelector);
  if (!user) {
    return <Redirect to={redirectTo} />
  }
  return <Route {...props} />
}
