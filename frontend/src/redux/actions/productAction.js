import axios from 'axios'

// Get data from backend
export const getProduct = (category) => async (dispatch) => {
  try {
    dispatch({
      type: 'ALL_PRODUCT_REQUESTS',
    })
    let link = `https://pradha-backend.herokuapp.com/api/v1/products`
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

// Admin Routes

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: 'NEW_PRODUCT_REQUEST' })
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
    const { data } = await axios.post(
      `https://pradha-backend.herokuapp.com/api/v1/admin/products/new`,
      productData,
      config
    )
    dispatch({
      type: 'NEW_PRODUCT_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'NEW_PRODUCT_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_PRODUCT_REQUEST' })
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.put(
      `https://pradha-backend.herokuapp.com/api/v1/admin/product/${id}`,
      productData,
      config
    )
    dispatch({
      type: 'UPDATE_PRODUCT_SUCCESS',
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: 'UPDATE_PRODUCT_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_PRODUCT_REQUEST' })
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.delete(
      `https://pradha-backend.herokuapp.com/api/v1/admin/product/${id}`,
      config
    )
    dispatch({
      type: 'DELETE_PRODUCT_SUCCESS',
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: 'DELETE_PRODUCT_FAIL',
      payload: error.response.data.message,
    })
  }
}
