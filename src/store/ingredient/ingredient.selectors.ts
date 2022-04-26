import {AppState} from "../types";
import {IIngredient, TIngredientsItems} from "types/burger-ingredient";

export const isShowSelector = (state: AppState) => {
  const {isShowIngredientDetails} = state.ingredient;
  return {isShowIngredientDetails};
}

export const getIngredientSelector = (id: string) => (state: AppState): IIngredient | undefined =>
  state.ingredient.ingredients.find(({_id}) => _id === id);

export const ingredientStateSelector = (state: AppState) => state.ingredient;

export const ingredientDetailsList = (state: AppState) => state.ingredient.ingredients.reduce<TIngredientsItems>((obj, item) => {
  obj[item._id] = item;
  return obj;
}, {});
