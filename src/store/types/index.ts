import { ThunkAction } from 'redux-thunk';
import {Dispatch, Action, ActionCreator} from "redux";
import { store } from "store";

import {IIngredientState, TIngredientActions} from "../ingredient/ingredient.types";
import { IUserState, TUserActions } from "../user/user.types";
import {TOrderActions, TOrderState } from "../order/order.types";
import { TWebsocketActions, TWebsocketState } from 'store/websocket/websocket.types';

export type TAppActions =
  | TIngredientActions
  | TUserActions
  | TOrderActions
  | TWebsocketActions;

export type AppDispatch = Dispatch<TAppActions>;

export type AppState = {
  ingredient: IIngredientState;
  user: IUserState;
  order: TOrderState;
  ws: TWebsocketState;
};

export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TAppActions>
>;
