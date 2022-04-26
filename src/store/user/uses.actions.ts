import {api} from "services/api";
import {deleteCookie, setCookie} from "../../utils/cookie/cookie";
import { TUser } from "types/user";
import { AppDispatch, AppThunk } from "store/types";
import {LoginBody} from "services/api/login";

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
  logout: (): ILogout => ({
    type: EActionUser.LOGOUT,
  }),
}

export const loginUser: AppThunk = (data: LoginBody) => {
  return function(dispatch: AppDispatch) {
    api.login(data)
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

export const logout: AppThunk = () => {
  return function(dispatch: AppDispatch): void {
    const refreshToken = localStorage.getItem('refreshToken') || '';

    api.logout({token: refreshToken})
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
