import {ActionsIngredient, IIngredientState} from "./ingredient/ingredient.types";
import {ActionsUser, IUserState} from "./user/user.types";
import {Dispatch} from "redux";

export type AppActions =
  | ActionsIngredient
  | ActionsUser;

export type AppDispatch = Dispatch<AppActions>;

export type AppState = {
  ingredient: IIngredientState;
  user: IUserState;
};

export type TActionsType<T> = {
  type: T;
  payload: any;
}
