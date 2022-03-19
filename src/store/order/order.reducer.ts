import { EActionOrder } from "./order.actions";
import { TOrderActions, TOrderState } from "./order.types";

const initialState: TOrderState = {
  ordersLoading: false,
  ordersFailed: false,
  orders: [],
  error: null,
  total: 0,
  totalToday: 0,
  orderDetails: {},
  orderDetailsRequest: false,
  orderDetailsFailed: false,
  burgerIngredient: [],
  isShowOrderDetails: false,
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case EActionOrder.WS_GET_ORDERS: {
      return {
        ...state,
        ordersLoading: true,
      }
    }
    case EActionOrder.WS_SET_ORDERS:
      const {orders, total, totalToday} = action.payload;
      return {
        ...state,
        total,
        totalToday,
        orders: orders,
        ordersLoading: false,
      };
    case EActionOrder.CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderDetailsRequest: true,
      }
    }
    case EActionOrder.WS_ERROR_ORDERS: {
      return {
        ...state,
        error: action.payload,
        ordersLoading: false,
      }
    }
    case EActionOrder.CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderDetailsRequest: false,
        orderDetailsFailed: false,
        burgerIngredient: [],
        orderDetails: action.payload,
        isShowOrderDetails: true,
      }
    }
    case EActionOrder.CREATE_ORDER_FAILED: {
      return {
        ...state,
        orderDetailsRequest: false,
        orderDetailsFailed: true,
      }
    }
    case EActionOrder.ADD_INGREDIENT: {

      const ingredient = {
        ...action.payload,
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
    case EActionOrder.DELETE_INGREDIENT: {
      return {
        ...state,
        burgerIngredient: state.burgerIngredient.filter((ingredient) => ingredient.id !== action.payload),
      }
    }
    case EActionOrder.MOVE_INGREDIENT: {
      const {dragIndex, hoverIndex} = action.payload;
      const ingredients = [...state.burgerIngredient];
      const moveItem = ingredients[dragIndex];
      ingredients[dragIndex] = ingredients[hoverIndex];
      ingredients[hoverIndex] = moveItem;
      return {
        ...state,
        burgerIngredient: ingredients,
      }
    }
    case EActionOrder.HIDE_DETAILS_ORDER_MODAL: {
      return {
        ...state,
        isShowOrderDetails: false,
        orderDetails: {},
      }
    }
    default:
      return state;
  }
}
