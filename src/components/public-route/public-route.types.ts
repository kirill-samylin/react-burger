import {RouteProps} from "react-router-dom";

export interface PublicRouteTypes extends RouteProps {
  redirectTo: string;
}
