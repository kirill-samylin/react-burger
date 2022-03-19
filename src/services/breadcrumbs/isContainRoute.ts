/*
 * state -- history state of app
 * route -- url of a new breadcrumb  */
import {LocationState} from "types/location";

export const isContainRoute = (state: LocationState, route: string) => state.some(({ url }) => url === route);
