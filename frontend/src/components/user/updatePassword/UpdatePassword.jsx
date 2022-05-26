import React, { Fragment, useState, useEffect } from 'react'
// import './UpdatePassword.css'
import Loader from '../../layout/loading/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearErrors,
  updatePassword,
} from '../../../redux/actions/profileAction'
import { useAlert } from 'react-alert'
import MetaData from '../../MetaData'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'
import { Button, Container } from '@mui/material'
import { TextField } from '@mui/material'

const UpdatePassword = ({ history }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alert = useAlert()
  const { error, isUpdated, loading } = useSelector(
    (state) => state.profileReducer
  )
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const updatePasswordSubmit = (e) => {
    e.preventDefault()
    const myForm = new FormData()
    myForm.set('oldPassword', oldPassword)
    myForm.set('newPassword', newPassword)
    myForm.set('confirmPassword', confirmPassword)
    dispatch(updatePassword(myForm))
  }
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (isUpdated) {
      alert.success('Profile Updated Successfully')
      navigate('/account')
      dispatch({
        type: 'UPDATE_PASSWORD_RESET',
      })
    }
  }, [dispatch, error, alert, history, isUpdated, navigate])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Change Password' />
          <Container maxWidth='sm'>
            <Box
              sx={{
                position: 'relative',
                top: '11vh',
                padding: '5vh 5vh 10vh 5vh',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h2 className='updatePasswordHeading' sx={{ margin: '10px' }}>
                Change Password
              </h2>
              <Box sx={{ margin: '5px', width: '500px' }}>
                <TextField
                  type='password'
                  placeholder='Old Password'
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Box>

              <Box sx={{ margin: '5px' }}>
                <TextField
                  type='password'
                  placeholder='New Password'
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Box>
              <Box sx={{ margin: '5px' }}>
                <TextField
                  type='password'
                  placeholder='Confirm Password'
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Box>
              <Button
                className='button'
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, width: '230px' }}
                onClick={updatePasswordSubmit}
              >
                Update Profile
              </Button>
            </Box>
          </Container>
        </Fragment>
      )}
    </Fragment>
  )
}

export default UpdatePassword
