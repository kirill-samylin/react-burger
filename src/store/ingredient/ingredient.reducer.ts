import {TIngredientActions, IIngredientState} from "./ingredient.types";
import {EActionIngredient} from "./ingredient.actions";
import { EIngredientType } from "types/burger-ingredient";

const initialState: IIngredientState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  isShowIngredientDetails: false,
  currentTabIngredients: EIngredientType.BUN,
};

export const ingredientReducer = (state: IIngredientState = initialState, action: TIngredientActions) => {
  switch (action.type) {
    case EActionIngredient.GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case EActionIngredient.GET_INGREDIENTS_SUCCESS: {
      return {...state, ingredientsFailed: false, ingredients: action.payload, ingredientsRequest: false};
    }
    case EActionIngredient.GET_INGREDIENTS_FAILED: {
      return {...state, ingredientsFailed: true, ingredientsRequest: false};
    }
    case EActionIngredient.TAB_SWITCH_INGREDIENTS: {
      return {
        ...state,
        currentTabIngredients: action.payload,
      }
    }

    default: {
      return state;
    }
  }
}
