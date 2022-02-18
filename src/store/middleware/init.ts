import {Dispatch} from "redux";
import {getIngredientsRequest, getUserRequest, updateTokenRequest} from "services/api";
import { ingredientActions } from "store/ingredient/ingredient.actions";
import { userActions } from "store/user/uses.actions";
import {getCookie, setCookie} from "utils/cookie/cookie";

export const initMiddleware = () => {
  return async function(dispatch: Dispatch) {
    dispatch(userActions.initUser());
    dispatch(ingredientActions.getIngredientsRequest());
    let accessToken: string = getCookie('accessToken') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';
    await getIngredientsRequest()
      .then(ingredients => {
        dispatch(ingredientActions.getIngredientsSuccess({ingredients}));
      })
      .catch(() => {
        dispatch(ingredientActions.getIngredientsFailed());
      });
    try {
      if (!refreshToken) {
        return dispatch(userActions.logout());
      }
      if (!accessToken) {
        const {success, accessToken: token} = await updateTokenRequest({token: refreshToken});
        if (!success) throw new Error('NOT');
        accessToken = token;
        setCookie('accessToken', token, {expires: 600});
      }
      const {success: resp, user} = await getUserRequest(accessToken);
      if (!resp) throw new Error('NOT');
      dispatch(userActions.login({user}));
    } catch {
      dispatch(userActions.logout());
    }
  }
}