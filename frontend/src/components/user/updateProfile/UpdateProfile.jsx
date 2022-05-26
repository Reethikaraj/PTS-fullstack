import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../../layout/loading/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearErrors,
  updateProfile,
} from '../../../redux/actions/profileAction'
import { useAlert } from 'react-alert'
import MetaData from '../../MetaData'
import { Box, Grid, Button, TextField, Container } from '@mui/material'
import './UpdateProfile.css'
import { useNavigate } from 'react-router-dom'
const UpdateProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alert = useAlert()
  const { user } = useSelector((state) => state.userReducer)
  const { error, isUpdated, loading } = useSelector(
    (state) => state.profileReducer
  )
  const [name, setName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setEmail] = useState('')
  const updateProfileSubmit = (e) => {
    e.preventDefault()
    const myForm = new FormData()
    myForm.set('name', name)
    myForm.set('lastName', lastName)
    myForm.set('email', email)
    dispatch(updateProfile(myForm))
  }
  useEffect(() => {
    if (user) {
      setName(user.name)
      setlastName(user.lastName)
      setEmail(user.email)
    }
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (isUpdated) {
      alert.success('Profile Updated Successfully')
      navigate('/account')
      dispatch({
        type: 'UPDATE_PROFILE_RESET',
      })
    }
  }, [dispatch, error, alert, user, isUpdated, navigate])
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Update Profile' />
          <Container
            className='updateProfileContainer'
            maxWidth='sm'
            sx={{ position: 'relative', top: '13vh' }}
          >
            <Box
              sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box component='form'>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Old first name'
                      defaultValue={user.name}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='firstName'
                      name='name'
                      label='New first name'
                      value={name}
                      onChange={(e) => {
                        e.preventDefault()
                        setName(e.target.value)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Old last name'
                      defaultValue={user.lastName}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='firstName'
                      name='name'
                      label='New Last name'
                      value={lastName}
                      onChange={(e) => {
                        e.preventDefault()
                        setlastName(e.target.value)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Old Email Address'
                      defaultValue={user.email}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='email'
                      label='New Email Address'
                      name='email'
                      autoComplete='email'
                      value={email}
                      onChange={(e) => {
                        e.preventDefault()
                        setEmail(e.target.value)
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  className='button'
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  onClick={updateProfileSubmit}
                >
                  UpdateProfile
                </Button>
                <Button
                  className='button'
                  variant='contained'
                  fullWidth
                  onClick={() => navigate('/account')}
                >
                  Back
                </Button>
              </Box>
            </Box>
          </Container>
        </Fragment>
      )}
    </Fragment>
  )
}
export default UpdateProfile
