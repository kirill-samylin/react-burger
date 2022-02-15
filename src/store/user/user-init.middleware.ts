import {Dispatch} from "redux";
import {userActions} from "./uses.actions";
import {getUserRequest, updateTokenRequest} from "services/api";
import {getCookie, setCookie} from "utils/cookie/cookie";

export const userInitMiddleware = () => {
  return async function(dispatch: Dispatch) {
    dispatch(userActions.initUser());
    let accessToken: string = getCookie('accessToken') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';
    try {
      if (!refreshToken) {
        return dispatch(userActions.logout());
      }
      if (!accessToken) {
        const {success, accessToken: token} = await updateTokenRequest({token: refreshToken});
        if (!success) throw new Error('NOT');
        accessToken = token;
        setCookie('accessToken', token, {expires: 1200});
      }
      const {success: resp, user} = await getUserRequest(accessToken);
      if (!resp) throw new Error('NOT');
      dispatch(userActions.login({user}));
    } catch {
      dispatch(userActions.logout());
    }
  }
}
