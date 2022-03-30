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

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'REGISTER_USER_REQUEST' })
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    const { data } = await axios.post(
      'http://localhost:5000/api/v1/user/register',
      userData,
      config
    )
    // .then((data) =>
    //   localStorage.setItem('token', JSON.stringify(data.data.token))
    // )
    dispatch({ type: 'REGISTER_USER_SUCCESS', payload: data.user })
  } catch (error) {
    dispatch({
      type: 'REGISTER_USER_FAIL',
      payload: error.response.data.message,
    })
  }
}

// Load User
export const loadUser = () => async (dispatch) => {
  console.log('dispatching from loadUser, user.Action')
  try {
    dispatch({ type: 'LOAD_USER_REQUEST' })
    const { data } = await axios.get('http://localhost:5000/api/v1/user/me')
    dispatch({ type: 'LOAD_USER_SUCCESS', payload: data.user })
  } catch (error) {
    dispatch({ type: 'LOAD_USER_FAIL', payload: error.response.data.message })
  }
}

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get('http://localhost:5000/api/v1/user/logout')
    dispatch({ type: 'LOGOUT_SUCCESS' })
  } catch (error) {
    dispatch({ type: 'LOGOUT_FAIL', payload: error.response.data.message })
  }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' })
}
