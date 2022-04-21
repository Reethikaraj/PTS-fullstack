import axios from 'axios'

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  console.log('dispatched')
  try {
    dispatch({ type: 'PRODUCT_DETAILS_REQUEST' })
    const { data } = await axios.get(
      `https://pradha-backend.herokuapp.com/api/v1/product/${id}`
    )
    console.log(data)
    dispatch({
      type: 'PRODUCT_DETAILS_SUCCESS',
      payload: data.product,
    })
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DETAILS_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' })
}
