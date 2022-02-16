import {AppState} from "../types";
import {IIngredient} from "../../types/burger-ingredient";

export const isShowSelector = (state: AppState) => {
  const {isShowIngredientDetails, isShowOrderDetails} = state.ingredient;
  return {isShowIngredientDetails, isShowOrderDetails};
}

export const getIngredientSelector = (id: string) => (state: AppState): IIngredient | undefined =>
  state.ingredient.ingredients.find(({_id}) => _id === id);
export const orderDetailsSelector = (state: AppState) => state.ingredient.orderDetails;

export const ingredientStateSelector = (state: AppState) => state.ingredient;

export const isIngredientLoaded = () => (state: AppState): boolean => !state.ingredient.ingredientsRequest
