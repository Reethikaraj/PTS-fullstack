import axios from 'axios'

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: 'CREATE_ORDER_REQUEST' })
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      'https://pradha-backend.herokuapp.com/api/v1/order/new',
      order,
      config
    )
    dispatch({ type: 'CREATE_ORDER_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'CREATE_ORDER_FAIL',
      payload: error.response.data.message,
    })
  }
}

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: 'MY_ORDERS_REQUEST' })
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get(
      'https://pradha-backend.herokuapp.com/api/v1/order/me',
      config
    )
    dispatch({ type: 'MY_ORDERS_SUCCESS', payload: data.orders })
  } catch (error) {
    dispatch({
      type: 'MY_ORDERS_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'ORDER_DETAILS_REQUEST' })
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(
      `https://pradha-backend.herokuapp.com/api/v1/order/${id}`,
      config
    )
    dispatch({ type: 'ORDER_DETAILS_SUCCESS', payload: data.order })
  } catch (error) {
    dispatch({
      type: 'ORDER_DETAILS_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: 'ALL_ORDERS_REQUEST' })
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get(
      'https://pradha-backend.herokuapp.com/api/v1/admin/orders',
      config
    )
    dispatch({ type: 'ALL_ORDERS_SUCCESS', payload: data.orders })
  } catch (error) {
    dispatch({
      type: 'ALL_ORDERS_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Update status (admin)
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_ORDER_REQUEST' })
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.put(
      `https://pradha-backend.herokuapp.com/api/v1/admin/order/updatestatus/${id}`,
      order,
      config
    )
    dispatch({ type: 'UPDATE_ORDER_SUCCESS', payload: data.success })
  } catch (error) {
    dispatch({
      type: 'UPDATE_ORDER_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Delete Order (admin)
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_ORDER_REQUEST' })
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.delete(
      `https://pradha-backend.herokuapp.com/api/v1/admin/order/delete/${id}`,
      config
    )
    dispatch({ type: 'DELETE_ORDER_SUCCESS', payload: data.success })
  } catch (error) {
    dispatch({
      type: 'DELETE_ORDER_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' })
}
