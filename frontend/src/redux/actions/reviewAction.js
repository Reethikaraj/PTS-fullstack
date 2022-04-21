import axios from 'axios'
// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: 'NEW_REVIEW_REQUEST' })
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.put(
      `https://pradha-backend.herokuapp.com/api/v1/product/review`,
      reviewData,
      config
    )
    dispatch({
      type: 'NEW_REVIEW_SUCCESS',
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: 'NEW_REVIEW_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'ALL_REVIEW_REQUEST' })
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get(
      ` https://pradha-backend.herokuapp.com/api/v1/reviews?id=${id}`,
      config
    )
    dispatch({
      type: 'ALL_REVIEW_SUCCESS',
      payload: data.reviews,
    })
  } catch (error) {
    dispatch({
      type: 'ALL_REVIEW_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_REVIEW_REQUEST' })
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.delete(
      `https://pradha-backend.herokuapp.com/api/v1/reviews?id=${reviewId}&productId=${productId}`,
      config
    )
    dispatch({
      type: 'DELETE_REVIEW_SUCCESS',
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: 'DELETE_REVIEW_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' })
}
