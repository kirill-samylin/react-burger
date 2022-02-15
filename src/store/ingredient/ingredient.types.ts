import {TActionsType} from "../types";
import {ActionIngredient} from "./ingredient.actions";
import {IBurgerIngredient, IIngredient} from "../../types/burger-ingredient";



export interface IIngredientState {
  ingredients: IIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  burgerIngredient: IBurgerIngredient[];
  orderDetailsRequest: boolean;
  orderDetailsFailed: boolean;
  ingredientDetails: {
    image?: string;
    name?: string;
    fat?: number;
    calories?: number;
    carbohydrates?: number;
    proteins?: number;
  };
  isShowIngredientDetails: boolean;
  currentTabIngredients: string;
  isShowOrderDetails: boolean;
  orderDetails: {
    number?: number;
  };
}

export type ActionsIngredient = TActionsType<ActionIngredient>;
