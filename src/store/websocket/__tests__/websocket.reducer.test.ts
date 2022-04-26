import {wsReducer} from "../websocket.reducer";
import {TWebsocketState} from "../websocket.types";
import {EActionWs} from "../websocket.actions";

describe('Websocket reducer test',() => {

  it('should connect websocket', () => {
    const state = wsReducer({} as TWebsocketState, {
      type: EActionWs.WS_CONNECTION_SUCCESS
    })
    expect(state).toEqual({wsConnected: true})
  })

  it('should closed websocket', () => {
    const state = wsReducer({} as TWebsocketState, {
      type: EActionWs.WS_CONNECTION_CLOSED
    })
    expect(state).toEqual({wsConnected: false})
  })

  it('should set message', () => {
    const state = wsReducer({messages: ['one']} as TWebsocketState, {
      type: EActionWs.WS_GET_MESSAGE,
      payload: 'two'
    })
    expect(state).toEqual({
      messages: ['one', 'two']
    })
  })

})
