import axios from 'axios'

// Update Profile
export const updateProfile = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'UPDATE_PROFILE_REQUEST ' })
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    // console.log('token', token, 'userData', userData)
    const { data } = await axios.put(
      'https://pradha-backend.herokuapp.com/api/v1/user/me/update',
      userData,
      config
    )
    dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: data.success })
  } catch (error) {
    dispatch({
      type: 'UPDATE_PROFILE_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_PASSWORD_REQUEST' })
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.put(
      `https://pradha-backend.herokuapp.com/api/v1/user/update/password`,
      passwords,
      config
    )
    dispatch({ type: 'UPDATE_PASSWORD_SUCCESS', payload: data.success })
  } catch (error) {
    dispatch({
      type: 'UPDATE_PASSWORD_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: 'FORGOT_PASSWORD_REQUEST' })
    const config = { headers: { 'Content-Type': 'application/json' } }
    const { data } = await axios.post(
      `https://pradha-backend.herokuapp.com/api/v1/user/forgot/password`,
      email,
      config
    )
    dispatch({ type: 'FORGOT_PASSWORD_SUCCESS', payload: data.message })
  } catch (error) {
    dispatch({
      type: 'FORGOT_PASSWORD_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: 'RESET_PASSWORD_REQUEST' })
    const config = { headers: { 'Content-Type': 'application/json' } }
    const { data } = await axios.put(
      `https://pradha-backend.herokuapp.com/api/v1/user/reset/password/${token}`,
      passwords,
      config
    )
    dispatch({ type: 'RESET_PASSWORD_SUCCESS', payload: data.success })
  } catch (error) {
    dispatch({
      type: 'RESET_PASSWORD_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' })
}
