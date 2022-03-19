import {LoginBody, loginRequest} from "../../services/api";
import {Dispatch} from "redux";
import {deleteCookie, setCookie} from "../../utils/cookie/cookie";
import {logoutRequest} from "../../services/api/logoutRequest/logoutRequest";
import { TUser } from "types/user";

export enum EActionUser {
  INIT_USER = 'INIT_USER',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export interface IInitUser {
  readonly type: typeof EActionUser.INIT_USER;
}

export interface ILogin {
  readonly type: typeof EActionUser.LOGIN;
  readonly payload: TUser;
}

export interface ILogout {
  readonly type: typeof EActionUser.LOGOUT;
}

export const userActions = {
  initUser: (): IInitUser => ({
    type: EActionUser.INIT_USER,
  }),
  login: (payload: TUser): ILogin => ({
    type: EActionUser.LOGIN,
    payload,
  }),
  logout: () => ({
    type: EActionUser.LOGOUT,
  }),
}

export const loginUser = (data: LoginBody) => {
  return function(dispatch: Dispatch) {
    loginRequest(data)
      .then(({user, accessToken, refreshToken, success}) => {
        if (!success) {
          return Promise.reject('error');
        }
        setCookie('accessToken', accessToken, {expires: 600});
        localStorage.setItem('refreshToken', refreshToken);
        dispatch(userActions.login(user));
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
