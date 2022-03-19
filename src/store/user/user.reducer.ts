import {EActionUser} from "./uses.actions";
import {IUserState, TUserActions} from "./user.types";

const initialState: IUserState = {
  user: null,
  isInitialized: false,
};

export const userReducer = (state: IUserState = initialState, action: TUserActions): IUserState => {
  switch (action.type) {
    case EActionUser.INIT_USER: {
      return {...state, isInitialized: false};
    }
    case EActionUser.LOGIN: {
      return {...state, isInitialized: true, user: action.payload};
    }
    case EActionUser.LOGOUT: {
      return {...state, isInitialized: true, user: null};
    }
    default: {
      return state;
    }
  }
}
