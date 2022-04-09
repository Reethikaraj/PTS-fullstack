import axios from 'axios'

// Update Profile
export const updateProfile = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'UPDATE_PROFILE_REQUEST ' })
    // const {
    //   userLogin: { token },
    // } = getState()
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
    console.log('token', token, 'userData', userData)
    const { data } = await axios.put(
      'http://localhost:5000/api/v1/user/me/update',
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

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' })
}
