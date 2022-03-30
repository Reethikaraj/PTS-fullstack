const initialState = {
  cartItems: [],
  shippingInfo: {},
  item: null,
  isItemExist: null,
}
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const item = action.payload
      //   Consider product = id of product
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      )
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case 'REMOVE_CART_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      }
    case 'SAVE_SHIPPING_INFO':
      return {
        ...state,
        shippingInfo: action.payload,
      }
    default:
      return state
  }
}
