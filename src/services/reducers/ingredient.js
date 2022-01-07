import {
  ADD_INGREDIENT,
  CLEAR_INGREDIENT_DETAILS_MODAL, CREATE_ORDER_FAILED, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_INGREDIENT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS, HIDE_DETAILS_ORDER_MODAL, MOVE_INGREDIENT,
  SET_INGREDIENT_DETAILS_MODAL,
  TAB_SWITCH_INGREDIENTS,
} from "../actions/ingredient";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  burgerIngredient: [],
  orderDetails: {},
  orderDetailsRequest: false,
  orderDetailsFailed: false,
  ingredientDetails: {},
  isShowIngredientDetails: false,
  currentTabIngredients: 'bun',
  isShowOrderDetails: false,
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false};
    }
    case GET_INGREDIENTS_FAILED: {
      return {...state, ingredientsFailed: true, ingredientsRequest: false};
    }
    case SET_INGREDIENT_DETAILS_MODAL: {
      return {
        ...state,
        isShowIngredientDetails: true,
        ingredientDetails: action.ingredient,
      }
    }
    case CLEAR_INGREDIENT_DETAILS_MODAL: {
      return {
        ...state,
        isShowIngredientDetails: false,
        ingredientDetails: {},
      }
    }
    case TAB_SWITCH_INGREDIENTS: {
      return {
        ...state,
        currentTabIngredients: action.currentTabIngredients,
      }
    }
    case ADD_INGREDIENT: {

      const ingredient = {
        ...action.ingredient,
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
    case DELETE_INGREDIENT: {
      return {
        ...state,
        burgerIngredient: state.burgerIngredient.filter((ingredient) => ingredient.id !== action.id),
      }
    }
    case MOVE_INGREDIENT: {
      const {dragIndex, hoverIndex} = action.move;
      const ingredients = [...state.burgerIngredient];
      const moveItem = ingredients[dragIndex];
      ingredients[dragIndex] = ingredients[hoverIndex];
      ingredients[hoverIndex] = moveItem;
      return {
        ...state,
        burgerIngredient: ingredients,
      }
    }
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderDetailsRequest: true,
      }
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderDetailsRequest: false,
        orderDetailsFailed: false,
        burgerIngredient: [],
        orderDetails: action.orderDetails,
        isShowOrderDetails: true,
      }
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        orderDetailsRequest: false,
        orderDetailsFailed: true,
      }
    }
    case HIDE_DETAILS_ORDER_MODAL: {
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
