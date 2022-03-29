import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../../loading/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearErrors,
  updateProfile,
} from '../../../redux/actions/profileAction'
import { loadUser } from '../../../redux/actions/userAction'
import { useAlert } from 'react-alert'
import MetaData from '../../MetaData'
import { Box, Grid, Button, TextField, Container } from '@mui/material'
import './UpdateProfile.css'
const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const { user } = useSelector((state) => state.userReducer)
  const { error, isUpdated, loading } = useSelector(
    (state) => state.profileReducer
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState()
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png')
  const updateProfileSubmit = (e) => {
    e.preventDefault()
    const myForm = new FormData()
    myForm.set('name', name)
    myForm.set('email', email)
    myForm.set('avatar', avatar)
    dispatch(updateProfile(myForm))
  }
  const updateProfileDataChange = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result)
        setAvatar(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }
  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setAvatarPreview(user.avatar.url)
    }
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (isUpdated) {
      alert.success('Profile Updated Successfully')
      dispatch(loadUser())
      history.push('/account')
      dispatch({
        type: 'UPDATE_PROFILE_RESET',
      })
    }
  }, [dispatch, error, alert, history, user, isUpdated])
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Update Profile' />
          <Container className='updateProfileContainer '>
            <Box
              // Since we are uploading image also
              encType='multipart/form-data'
              sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box component='form'>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='firstName'
                      name='name'
                      label='Name'
                      value={name}
                      onChange={updateProfileDataChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='email'
                      label='Email Address'
                      name='email'
                      autoComplete='email'
                      value={email}
                      onChange={updateProfileDataChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name='password'
                      label='Password'
                      type='password'
                      id='password'
                      autoComplete='new-password'
                      //   value={password}
                      onChange={updateProfileDataChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div className='registerImage'>
                      <img src={avatarPreview} alt='User' />
                      <TextField
                        className='imageTextfield '
                        required
                        fullWidth
                        name='avatar'
                        accept='image/*'
                        type='file'
                        onChange={updateProfileDataChange}
                      />
                    </div>
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
              </Box>
            </Box>
          </Container>
        </Fragment>
      )}
    </Fragment>
  )
}
export default UpdateProfile
