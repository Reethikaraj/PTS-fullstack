import axios from 'axios'

// Get data from backend
export const getProduct = (category) => async (dispatch) => {
  try {
    dispatch({
      type: 'ALL_PRODUCT_REQUESTS',
    })
    let link = `http://localhost:5000/api/v1/products`
    if (category) {
      link = `http://localhost:5000/api/v1/products?&category=${category}`
    }
    const { data } = await axios.get(link)
    dispatch({
      type: 'ALL_PRODUCT_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'ALL_PRODUCT_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' })
}
