const initialState = {
  products: [],
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_PRODUCT_REQUESTS': {
      return {
        loading: true,
        products: [],
      }
    }
    case 'ALL_PRODUCT_SUCCESS': {
      return {
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
        resultsPerPage: action.payload.resultsPerPage,
        // filteredProductCount: action.payload.filteredProductCount,
      }
    }
    case 'ALL_PRODUCT_FAIL': {
      return {
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
