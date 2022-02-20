import {FC} from "react";
import {Redirect, Route, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelector} from "store/user/user.selectors";
import {PublicRouteTypes} from "./public-route.types";
import { LocationState } from "types/types";

export const PublicRoute: FC<PublicRouteTypes> = ({redirectTo, ...props}) => {
  const user = useSelector(userSelector);
  const { state } = useLocation<LocationState>();
  const redirectState = Array.isArray(state) ? state.find(({isRedirect}) => isRedirect) : null;

  if (user) {
    return <Redirect to={{
      pathname: redirectState ? redirectState.url : redirectTo,
      state: redirectState ? [redirectState] : [],
    }} />
  }
  return <Route {...props} />
}
