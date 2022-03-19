import {IInitUser, ILogin, ILogout} from "./uses.actions";
import { TUser } from "types/user";

export interface IUserState {
  user: null | TUser;
  isInitialized: boolean;
}

export type TUserActions = IInitUser | ILogin | ILogout;
