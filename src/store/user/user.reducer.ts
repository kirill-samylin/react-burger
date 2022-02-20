import {ActionUser} from "./uses.actions";
import {ActionsUser, IUserState} from "./user.types";

const initialState: IUserState = {
  user: null,
  isInitialized: false,
};

export const userReducer = (state: IUserState = initialState, action: ActionsUser): IUserState => {
  switch (action.type) {
    case ActionUser.INIT_USER: {
      return {...state, isInitialized: false};
    }
    case ActionUser.LOGIN: {
      return {...state, isInitialized: true, user: action.payload.user};
    }
    case ActionUser.LOGOUT: {
      return {...state, isInitialized: true, user: null};
    }
    default: {
      return state;
    }
  }
}
