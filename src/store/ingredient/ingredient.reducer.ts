import {ActionsIngredient, IIngredientState} from "./ingredient.types";
import {ActionIngredient} from "./ingredient.actions";

const initialState: IIngredientState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  burgerIngredient: [],
  orderDetails: {},
  orderDetailsRequest: false,
  orderDetailsFailed: false,
  isShowIngredientDetails: false,
  currentTabIngredients: 'bun',
  isShowOrderDetails: false,
};

export const ingredientReducer = (state: IIngredientState = initialState, action: ActionsIngredient) => {
  switch (action.type) {
    case ActionIngredient.GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case ActionIngredient.GET_INGREDIENTS_SUCCESS: {
      return {...state, ingredientsFailed: false, ingredients: action.payload.ingredients, ingredientsRequest: false};
    }
    case ActionIngredient.GET_INGREDIENTS_FAILED: {
      return {...state, ingredientsFailed: true, ingredientsRequest: false};
    }
    case ActionIngredient.TAB_SWITCH_INGREDIENTS: {
      return {
        ...state,
        currentTabIngredients: action.payload.currentTabIngredients,
      }
    }
    case ActionIngredient.ADD_INGREDIENT: {

      const ingredient = {
        ...action.payload.ingredient,
        id: +new Date(),
      };

      const burgerIngredients = state.burgerIngredient;
      const burgerIngredient = ingredient.type === 'bun' && burgerIngredients.length
        ? burgerIngredients[0].type === 'bun'
          ? burgerIngredients.map((item, index) => index === 0 ? ingredient : item)
          : [ingredient, ...burgerIngredients]
        : [...burgerIngredients, ingredient];

      return {
        ...state,
        burgerIngredient,
      }
    }
    case ActionIngredient.DELETE_INGREDIENT: {
      return {
        ...state,
        burgerIngredient: state.burgerIngredient.filter((ingredient) => ingredient.id !== action.payload.id),
      }
    }
    case ActionIngredient.MOVE_INGREDIENT: {
      const {dragIndex, hoverIndex} = action.payload.move;
      const ingredients = [...state.burgerIngredient];
      const moveItem = ingredients[dragIndex];
      ingredients[dragIndex] = ingredients[hoverIndex];
      ingredients[hoverIndex] = moveItem;
      return {
        ...state,
        burgerIngredient: ingredients,
      }
    }
    case ActionIngredient.CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderDetailsRequest: true,
      }
    }
    case ActionIngredient.CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderDetailsRequest: false,
        orderDetailsFailed: false,
        burgerIngredient: [],
        orderDetails: action.payload.orderDetails,
        isShowOrderDetails: true,
      }
    }
    case ActionIngredient.CREATE_ORDER_FAILED: {
      return {
        ...state,
        orderDetailsRequest: false,
        orderDetailsFailed: true,
      }
    }
    case ActionIngredient.HIDE_DETAILS_ORDER_MODAL: {
      return {
        ...state,
        isShowOrderDetails: false,
        orderDetails: {},
      }
    }
    default: {
      return state;
    }
  }
}
