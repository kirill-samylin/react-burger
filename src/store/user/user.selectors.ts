import { AppState } from "../types";
import { TUser } from "types/user";

export const userSelector = (state: AppState): TUser | null => state.user.user;
export const isInitSelector = (state: AppState): boolean => state.user.isInitialized;
