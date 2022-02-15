import {AppState} from "../types";

export const isShowSelector = (state: AppState) => {
  const {isShowIngredientDetails, isShowOrderDetails} = state.ingredient;
  return {isShowIngredientDetails, isShowOrderDetails};
}

export const ingredientDetailsSelector = (state: AppState) => state.ingredient.ingredientDetails;
export const orderDetailsSelector = (state: AppState) => state.ingredient.orderDetails;

export const ingredientStateSelector = (state: AppState) => state.ingredient;
