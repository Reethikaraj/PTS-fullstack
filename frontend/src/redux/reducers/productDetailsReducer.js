const initialState = {
  product: null,
  loading: false,
  error: null,
}
export const productDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCT_DETAILS_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'PRODUCT_DETAILS_SUCCESS':
      return {
        ...state,
        loading: false,
        product: action.payload,
      }
    case 'PRODUCT_DETAILS_FAIL':
      return {
        loading: false,
        error: action.payload,
      }
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}
