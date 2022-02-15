import {LoginBody, loginRequest} from "../../services/api";
import {Dispatch} from "redux";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookie/cookie";
import {logoutRequest} from "../../services/api/logoutRequest/logoutRequest";
import {updateUserBody, updateUserRequest} from "../../services/api/updateUserRequest/updateUserRequest";

export enum ActionUser {
  INIT_USER = 'INIT_USER',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export const userActions = {
  initUser: () => ({
    type: ActionUser.INIT_USER,
  }),
  login: (payload: {user: {email: string, name: string}}) => ({
    type: ActionUser.LOGIN,
    payload,
  }),
  logout: () => ({
    type: ActionUser.LOGOUT,
  }),
}

export const loginUser = (data: LoginBody) => {
  return function(dispatch: Dispatch) {
    loginRequest(data)
      .then(({user, accessToken, refreshToken, success}) => {
        if (!success) {
          return Promise.reject('error');
        }
        setCookie('accessToken', accessToken, {expires: 1200});
        localStorage.setItem('refreshToken', refreshToken);
        dispatch(userActions.login({user}));
      })
      .catch(() => dispatch(userActions.logout()));
  }
}

export const logout = () => {
  return function(dispatch: Dispatch): void {
    const refreshToken = localStorage.getItem('refreshToken') || '';

    logoutRequest({token: refreshToken})
      .then(({success}) => {
        if (!success) {
          return Promise.reject('error');
        }
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(userActions.logout());
      })
      .catch(() => dispatch(userActions.logout()));
  }
}

const updateUserInfo = (data: updateUserBody) => {
  return function(dispatch: Dispatch) {
    let accessToken: string = getCookie('accessToken') || '';
    return updateUserRequest(data, accessToken)
      .then(({user}) => dispatch(userActions.login({user})))
      .catch((err) => console.log(err));
  }
}
