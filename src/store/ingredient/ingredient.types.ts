import {
  EActionIngredient,
  IGetIngredientsFailed,
  IGetIngredientsRequest,
  IGetIngredientsSuccess,
  ITabSwitchIngredients
} from "./ingredient.actions";

import {EIngredientType, IBurgerIngredient, IIngredient} from "types/burger-ingredient";

export interface IIngredientState {
  ingredients: IIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  isShowIngredientDetails: boolean;
  currentTabIngredients: EIngredientType;
}

export type TIngredientActions =
  IGetIngredientsRequest |
  IGetIngredientsSuccess |
  IGetIngredientsFailed |
  ITabSwitchIngredients;
