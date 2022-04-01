const initialState = {
  loading: false,
  isUpdated: null,
  isDeleted: null,
  error: null,
}
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ' UPDATE_ORDER_REQUEST':
    case 'DELETE_ORDER_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'UPDATE_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      }
    case 'DELETE_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }
    case 'UPDATE_ORDER_FAIL':
    case 'DELETE_ORDER_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'UPDATE_ORDER_RESET':
      return {
        ...state,
        isUpdated: false,
      }
    case 'DELETE_ORDER_RESET':
      return {
        ...state,
        isDeleted: false,
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
