import {getIngredients as getIngredientsApi} from "../../utils/api";
import {url} from "../../constants/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SET_INGREDIENT_DETAILS_MODAL = 'SET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS_MODAL = 'CLEAR_INGREDIENT_DETAILS';

export const SET_ORDER_DETAILS_NUMBER = 'SET_ORDER_DETAILS_NUMBER';

export const TAB_SWITCH_INGREDIENTS = 'TAB_SWITCH_INGREDIENTS';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsApi(`${url}/ingredients`)
      .then(items => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: items
        });
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      });
  };
}
