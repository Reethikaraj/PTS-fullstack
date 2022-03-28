import axios from 'axios'

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' })
    const config = { headers: { 'Content-Type': 'application/json' } }
    const { data } = await axios.post(
      'http://localhost:5000/api/v1/user/login',
      { email, password },
      config
    )
    dispatch({ type: 'LOGIN_SUCCESS', payload: data.user })
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message })
  }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' })
}
