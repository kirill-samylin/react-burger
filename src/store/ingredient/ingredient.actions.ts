import {EIngredientType, IIngredient} from "types/burger-ingredient";

export enum EActionIngredient {
  GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST',
  GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS',
  GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED',
  TAB_SWITCH_INGREDIENTS = 'TAB_SWITCH_INGREDIENTS',
}

export interface IGetIngredientsRequest {
  readonly type: typeof EActionIngredient.GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof EActionIngredient.GET_INGREDIENTS_SUCCESS;
  readonly payload: IIngredient[];
}

export interface IGetIngredientsFailed {
  readonly type: typeof EActionIngredient.GET_INGREDIENTS_FAILED;
}

export interface ITabSwitchIngredients {
  readonly type: typeof EActionIngredient.TAB_SWITCH_INGREDIENTS;
  readonly payload: EIngredientType;
}

export const ingredientActions = {
  getIngredientsRequest: (): IGetIngredientsRequest => ({
    type: EActionIngredient.GET_INGREDIENTS_REQUEST,
  }),
  getIngredientsSuccess: (payload: IIngredient[]): IGetIngredientsSuccess => ({
    type: EActionIngredient.GET_INGREDIENTS_SUCCESS,
    payload,
  }),
  getIngredientsFailed: (): IGetIngredientsFailed => ({
    type: EActionIngredient.GET_INGREDIENTS_FAILED,
  }),
  tabSwitchIngredients: (payload: EIngredientType): ITabSwitchIngredients => ({
    type: EActionIngredient.TAB_SWITCH_INGREDIENTS,
    payload
  }),
}
