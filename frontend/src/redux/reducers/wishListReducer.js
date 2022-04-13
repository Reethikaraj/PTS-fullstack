const initialState = {
  wishList: [],
  item: null,
  isItemExist: null,
  itemExists: false,
}
export const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      const item = action.payload
      //   Consider product = id of product
      const isItemExist = state.wishList.find((i) => i.product === item.product)
      if (isItemExist) {
        return {
          ...state,
          wishList: state.wishList.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        }
      } else {
        return {
          ...state,
          wishList: [...state.wishList, item],
        }
      }
    case 'REMOVE_WISHLIST_ITEM':
      return {
        ...state,
        itemExists: false,
        wishList: state.wishList.filter((i) => i.product !== action.payload),
        // cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      }
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        wishList: [],
      }
    default:
      return state
  }
}
