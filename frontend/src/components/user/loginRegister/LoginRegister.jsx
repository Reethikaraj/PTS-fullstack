import React, { Fragment, useEffect, useRef, useState } from 'react'
import Loader from '../../loading/Loader'
import { Container, Box, Grid, Button, TextField, Link } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../../redux/actions/userAction'
import { useAlert } from 'react-alert'
import './LoginRegister.css'

const LoginRegister = () => {
  // Redux
  const dispatch = useDispatch()
  // To display errors
  const alert = useAlert()
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.userReducer
  )
  // useRef for switching tabs
  const loginTab = useRef(null)
  const registerTab = useRef(null)
  const switcherTab = useRef(null)
  // Login
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  // Register
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = user
  const [avatar, setAvatar] = useState('/assets/profile.png')
  const [avatarPreview, setAvatarPreview] = useState('/assets/profile.png')
  // Login
  const loginSubmit = (e) => {
    e.preventDefault()
    dispatch(login(loginEmail, loginPassword))
  }
  // Register
  const registerSubmit = (e) => {
    e.preventDefault()
    const myForm = new FormData()
    myForm.set('name', name)
    myForm.set('email', email)
    myForm.set('password', password)
    myForm.set('avatar', avatar)
    // dispatch(register(myForm))
  }

  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }
  useEffect(
    (error) => {
      if (error) {
        alert.error(error)
        dispatch(clearErrors())
      }
    },
    [dispatch, alert, error]
  )
  // Switching tabs
  const switchTabs = (e, tab) => {
    if (tab === 'login') {
      switcherTab.current.classList.add('shiftToNeutral')
      switcherTab.current.classList.remove('shiftToRight')
      registerTab.current.classList.remove('shiftToNeutralForm')
      loginTab.current.classList.remove('shiftToLeft')
    }
    if (tab === 'register') {
      switcherTab.current.classList.add('shiftToRight')
      switcherTab.current.classList.remove('shiftToNeutral')
      registerTab.current.classList.add('shiftToNeutralForm')
      loginTab.current.classList.add('shiftToLeft')
    }
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Container className='signin' maxWidth='xs'>
            <Box className='.loginSignUpBox '>
              <Box className='login_signUp_toggle'>
                <Box>
                  <p onClick={(e) => switchTabs(e, 'login')}>LOGIN</p>
                </Box>
                <Box className='tab_left'>
                  <p onClick={(e) => switchTabs(e, 'register')}>REGISTER</p>
                </Box>
              </Box>
              <Button
                className='switch'
                variant='contained'
                ref={switcherTab}
              ></Button>
            </Box>

            <Box
              className='loginForm'
              ref={loginTab}
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box component='form'>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='Email Address'
                  type='email'
                  value={loginEmail}
                  onChange={(e) => {
                    e.preventDefault()
                    setLoginEmail(e.target.value)
                  }}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  type='password'
                  label='Password'
                  value={loginPassword}
                  onChange={(e) => {
                    e.preventDefault()
                    setLoginPassword(e.target.value)
                  }}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  onClick={loginSubmit}
                >
                  Login
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href='#' variant='body2'>
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box
              className='signUpForm'
              ref={registerTab}
              // Since we are uploading image also
              encType='multipart/form-data'
              sx={{
                marginTop: 13,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box component='form'>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete='given-name'
                      name='Name'
                      required
                      fullWidth
                      id='firstName'
                      label='Name'
                      autoFocus
                      value={name}
                      onChange={registerDataChange}
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
                      onChange={registerDataChange}
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
                      value={password}
                      onChange={registerDataChange}
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
                        onChange={registerDataChange}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              </Box>
            </Box>
          </Container>
        </Fragment>
      )}
    </Fragment>
  )
}

export default LoginRegister
