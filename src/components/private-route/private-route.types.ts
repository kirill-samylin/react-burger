import {RouteProps} from "react-router-dom";

export interface PrivateRouteProps extends RouteProps {
  redirectTo: string;
}
