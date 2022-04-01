import axios from 'axios'

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' })
    const config = {
      headers: { 'Content-Type': 'application/json', withCredentials: true },
    }
    const { data } = await axios
      .post(
        'http://localhost:5000/api/v1/user/login',
        { email, password },
        config
      )
      .then((res) => {
        // console.log('response', res)
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
      })
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message })
  }
}

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'REGISTER_USER_REQUEST' })
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        withCredentials: true,
      },
    }
    const { data } = await axios
      .post('http://localhost:5000/api/v1/user/register', userData, config)
      .then((res) => {
        console.log('response', res)
        localStorage.setItem('token', res.data.token)
      })

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
