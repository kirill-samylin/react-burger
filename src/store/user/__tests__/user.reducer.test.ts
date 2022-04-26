import {userReducer} from "../user.reducer";
import {EActionUser} from "../uses.actions";
import {IUserState} from "../user.types";


describe('', () => {

  it('should init user', function () {
    const state = userReducer({} as IUserState, {
      type: EActionUser.INIT_USER
    })

    expect(state).toEqual({isInitialized: false})
  });

  it('should login', function () {
    const state = userReducer({} as IUserState, {
      type: EActionUser.LOGIN,
      payload: {
        email: 'test@mail.ru',
        name: 'test',
      }
    })

    expect(state).toEqual({
      isInitialized: true,
      user: {
        email: 'test@mail.ru',
        name: 'test',
      }
    })
  });

  it('should logout', function () {
    const state = userReducer({} as IUserState, {
      type: EActionUser.LOGOUT
    })

    expect(state).toEqual({
      isInitialized: true,
      user: null
    })
  });

})
