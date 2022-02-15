import {ActionUser} from "./uses.actions";
import {TActionsType} from "../types";

export interface TUser {
  email: string;
  name: string;
  password?: string;
}

export interface IUserState {
  user: null | TUser;
  isInitialized: boolean;
}

export type ActionsUser = TActionsType<ActionUser>;
