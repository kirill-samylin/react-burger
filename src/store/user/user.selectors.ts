import {AppState} from "../types";
import {TUser} from "./user.types";

export const isAppInitializedSelector = (state: AppState) => state.user.isInitialized;
export const userSelector = (state: AppState): TUser | null => state.user.user;
