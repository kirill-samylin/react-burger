import {orderReducer} from "../order.reducer";
import {EActionOrder} from "../order.actions";
import {TOrderState} from "../order.types";
import {ordersData} from "./order.data";


describe('Order reducer test',() => {
  it('should change ger orders loading', () => {
    const state = orderReducer({} as TOrderState, {
      type: EActionOrder.WS_GET_ORDERS
    })
    expect(state).toEqual({ ordersLoading: true })
  })

  it('should set orders', () => {
    const state = orderReducer({} as TOrderState, {
      type: EActionOrder.WS_SET_ORDERS,
      payload: {
        success: true,
        orders: ordersData,
        total: 50,
        totalToday: 20,
      }
    })
    expect(state).toEqual({
      orders: ordersData,
      total: 50,
      totalToday: 20,
      ordersLoading: false
    })
  })

  it('should create order request', () => {
    const state = orderReducer({} as TOrderState, {
      type: EActionOrder.CREATE_ORDER_REQUEST,
    })
    expect(state).toEqual({
      orderDetailsRequest: true
    })
  })

  it('should ws order error', () => {
    const state = orderReducer({} as TOrderState, {
      type: EActionOrder.WS_ERROR_ORDERS,
      payload: new Event('error')
    })
    expect(state).toEqual({
      ordersLoading: false,
      error: new Event('error')
    })
  })

  it('should create order success', () => {
    const state = orderReducer({} as TOrderState, {
      type: EActionOrder.CREATE_ORDER_SUCCESS,
      payload: {
        number: 1111,
        name: 'test',
      }
    })
    expect(state).toEqual({
      orderDetailsRequest: false,
      orderDetailsFailed: false,
      burgerIngredient: [],
      orderDetails: {
        number: 1111,
        name: 'test',
      },
      isShowOrderDetails: true,
    })
  })

  it('should create order failed', () => {
    const state = orderReducer({} as TOrderState, {
      type: EActionOrder.CREATE_ORDER_FAILED,
    })
    expect(state).toEqual({
      orderDetailsRequest: false,
      orderDetailsFailed: true,
    })
  })

  it('should add ingredient', () => {
    const mockDate = new Date();
    jest
      .spyOn(global, 'Date')
      .mockImplementation(() => (mockDate as unknown) as string)
    const payload = {
      calories: 100,
      _id: 'test_id',
      fat: 40,
      carbohydrates: 20,
      name: 'test name',
      image: 'image',
      image_large: 'image_large',
      image_mobile: 'image_mobile',
      price: 123,
      proteins: 44,
      type: 'bun'
    };
    const state = orderReducer({burgerIngredient: []} as never, {
      type: EActionOrder.ADD_INGREDIENT,
      payload,
    })
    expect(state).toEqual({
      burgerIngredient: [{
        ...payload,
        id: +mockDate
      }]
    })
  })

  it('should delete ingredient', () => {
    const state = orderReducer({
      burgerIngredient: [
        {
          calories: 100,
          _id: 'test_id',
          fat: 40,
          carbohydrates: 20,
          name: 'test name',
          image: 'image',
          image_large: 'image_large',
          image_mobile: 'image_mobile',
          price: 123,
          proteins: 44,
          type: 'bun',
          id: 1234
        }
      ]
    } as TOrderState, {
      type: EActionOrder.DELETE_INGREDIENT,
      payload: 1234
    })
    expect(state).toEqual({
      burgerIngredient: []
    })
  })

  it('should move ingredient', () => {
    const ingredient = {
      calories: 100,
      _id: 'test_id',
      fat: 40,
      carbohydrates: 20,
      name: 'test name',
      image: 'image',
      image_large: 'image_large',
      image_mobile: 'image_mobile',
      price: 123,
      proteins: 44,
      type: 'bun',
    }
    const state = orderReducer({
      burgerIngredient: [
        {
          ...ingredient,
          id: 1111
        },
        {
          ...ingredient,
          id: 2222
        }
      ]
    } as TOrderState, {
      type: EActionOrder.MOVE_INGREDIENT,
      payload: {
        dragIndex: 0,
        hoverIndex: 1
      }
    })
    expect(state).toEqual({
      burgerIngredient: [
        {
          ...ingredient,
          id: 2222
        },
        {
          ...ingredient,
          id: 1111
        },
      ]
    })
  })

  it('should hide details order modal', () => {
    const state = orderReducer({} as TOrderState, {
      type: EActionOrder.HIDE_DETAILS_ORDER_MODAL,
    })
    expect(state).toEqual({
      isShowOrderDetails: false,
      orderDetails: {},
    })
  })

})
