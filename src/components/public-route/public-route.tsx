import {FC} from "react";
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelector} from "store/user/user.selectors";
import {PublicRouteTypes} from "./public-route.types";

export const PublicRoute: FC<PublicRouteTypes> = ({redirectTo, ...props}) => {
  const user = useSelector(userSelector);
  if (user) {
    return <Redirect to={redirectTo} />
  }
  return <Route {...props} />
}
