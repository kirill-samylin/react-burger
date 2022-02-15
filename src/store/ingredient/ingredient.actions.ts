import {
  createOrderRequest,
  getIngredientsRequest
} from "services/api";
import {Dispatch} from "redux";

export enum ActionIngredient {
  GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST',
  GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS',
  GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED',
  CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST',
  CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED',
  SET_INGREDIENT_DETAILS_MODAL = 'SET_INGREDIENT_DETAILS',
  CLEAR_INGREDIENT_DETAILS_MODAL = 'CLEAR_INGREDIENT_DETAILS',
  HIDE_DETAILS_ORDER_MODAL = 'HIDE_DETAILS_ORDER_MODAL',
  TAB_SWITCH_INGREDIENTS = 'TAB_SWITCH_INGREDIENTS',
  ADD_INGREDIENT = 'ADD_INGREDIENT',
  DELETE_INGREDIENT = 'DELETE_INGREDIENT',
  MOVE_INGREDIENT = 'MOVE_INGREDIENT',
}

export const ingredientActions = {
  getIngredientsRequest: () => ({
    type: ActionIngredient.GET_INGREDIENTS_REQUEST,
  }),
  getIngredientsSuccess: (payload: any) => ({
    type: ActionIngredient.GET_INGREDIENTS_SUCCESS,
    payload,
  }),
  getIngredientsFailed: () => ({
    type: ActionIngredient.GET_INGREDIENTS_FAILED,
  }),
  createOrderRequest: () => ({
    type: ActionIngredient.CREATE_ORDER_REQUEST,
  }),
  createOrderSuccess: (payload: any) => ({
    type: ActionIngredient.CREATE_ORDER_SUCCESS,
    payload,
  }),
  createOrderFailed: () => ({
    type: ActionIngredient.CREATE_ORDER_FAILED,
  }),
  setIngredientDetailsModal: (payload: any) => ({
    type: ActionIngredient.SET_INGREDIENT_DETAILS_MODAL,
    payload,
  }),
  cleanIngredientDetailsModal: () => ({
    type: ActionIngredient.CLEAR_INGREDIENT_DETAILS_MODAL
  }),
  hideDetailsOrderModal: () => ({
    type: ActionIngredient.HIDE_DETAILS_ORDER_MODAL
  }),
  tabSwitchIngredients: (payload: any) => ({
    type: ActionIngredient.TAB_SWITCH_INGREDIENTS,
    payload
  }),
  addIngredient: (payload: any) => ({
    type: ActionIngredient.ADD_INGREDIENT,
    payload,
  }),
  cleanIngredient: (payload: any) => ({
    type: ActionIngredient.DELETE_INGREDIENT,
    payload
  }),
  moveIngredient: (payload: any) => ({
    type: ActionIngredient.MOVE_INGREDIENT,
    payload
  }),
}


export function getIngredients() {
  return function(dispatch: Dispatch) {
    dispatch(ingredientActions.getIngredientsRequest());
    getIngredientsRequest()
      .then(ingredients => {
        dispatch(ingredientActions.getIngredientsSuccess({ingredients}));
      })
      .catch(() => {
        dispatch(ingredientActions.getIngredientsFailed());
      });
  };
}

export function createOrder(ids: string[]) {
  return function(dispatch: Dispatch) {
    dispatch(ingredientActions.createOrderRequest());
    createOrderRequest(ids)
      .then(orderDetails => dispatch(ingredientActions.createOrderSuccess({orderDetails})))
      .catch(() =>  dispatch(ingredientActions.createOrderFailed()));
  };
}
