const initialState = {
  products: [],
  loading: false,
  error: null,
  productCount: 0,
  resultsPerPage: 0,
  price: true,
  rating: false,
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
    case 'SORT_BY_PRICE':
      return {
        ...state,
        products: action.payload
          ? [...state.products].sort((a, b) => (a.price > b.price ? 1 : -1))
          : [...state.products].sort((a, b) => (a.price < b.price ? 1 : -1)),
        price: !state.price,
      }

    case 'SORT_BY_RATING':
      return {
        ...state,
        products: action.payload
          ? [...state.products].sort((a, b) => (a.rating > b.rating ? 1 : -1))
          : [...state.products].sort((a, b) => (a.rating < b.rating ? 1 : -1)),
        rating: !state.rating,
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
