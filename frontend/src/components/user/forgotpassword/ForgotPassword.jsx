import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../../layout/loading/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearErrors,
  forgotPassword,
} from '../../../redux/actions/profileAction'
import { useAlert } from 'react-alert'
import MetaData from '../../MetaData'
import { Box } from '@material-ui/core'
import { Button, Container, TextField } from '@mui/material'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const { error, message, loading } = useSelector(
    (state) => state.forgotPasswordReducer
  )
  const [email, setEmail] = useState('')
  const forgotPasswordSubmit = (e) => {
    e.preventDefault()
    const myForm = new FormData()
    myForm.set('email', email)
    dispatch(forgotPassword(myForm))
  }
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (message) {
      alert.success(message)
    }
  }, [dispatch, error, alert, message])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Forgot Password' />
          <Container maxWidth='xs'>
            <Box sx={{ position: 'relative', top: '12vh', margin: '1vh' }}>
              <Box sx={{ margin: '20px' }}>
                <h2>Forgot Password</h2>
              </Box>
              <Box>
                <TextField
                  type='email'
                  placeholder='Email'
                  required
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Button
                className='button'
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, width: '220px' }}
                onClick={forgotPasswordSubmit}
              >
                Login
              </Button>
            </Box>
          </Container>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ForgotPassword
