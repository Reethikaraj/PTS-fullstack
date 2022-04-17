const initialState = {
  wishList: [],
  item: null,
}
export const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      const item = action.payload
      return {
        ...state,
        wishList: [...state.wishList, item],
      }
    case 'REMOVE_WISHLIST_ITEM':
      return {
        ...state,
        wishList: state.wishList.filter((i) => i.product !== action.payload),
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
