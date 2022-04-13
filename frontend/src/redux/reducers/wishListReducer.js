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
          itemExists: false,
          wishList: state.wishList.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        }
      } else {
        return {
          ...state,
          itemExists: false,
          wishList: [...state.wishList, item],
        }
      }
    case 'REMOVE_WISHLIST_ITEM':
      return {
        ...state,
        itemExists: true,
        wishList: state.wishList.filter((item) => item !== action.payload.item),
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
