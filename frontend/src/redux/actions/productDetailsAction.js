import axios from 'axios'

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_DETAILS_REQUEST' })
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/product/${id}`
    )
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
