const initialState = {
  products: [],
  loading: false,
  error: null,
  productCount: 0,
  resultsPerPage: 0,
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_PRODUCT_REQUESTS': {
      return {
        ...state,
        loading: true,
        products: [],
      }
    }
    case 'ALL_PRODUCT_SUCCESS': {
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
        resultsPerPage: action.payload.resultsPerPage,
      }
    }
    case 'ALL_PRODUCT_FAIL': {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case 'CLEAR_ERRORS': {
      return {
        ...state,
        error: null,
      }
    }

    default:
      return state
  }
}
export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case 'NEW_PRODUCT_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'NEW_PRODUCT_SUCCESS':
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      }
    case 'NEW_PRODUCT_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'NEW_PRODUCT_RESET':
      return {
        ...state,
        success: false,
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
