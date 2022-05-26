import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Container, Box, Grid, Button, TextField, Link } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  login,
  clearErrors,
  register,
  forgotPassword,
} from '../../../redux/actions/userAction'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import './LoginRegister.css'

const LoginRegister = () => {
  // Redux
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // To display errors
  const alert = useAlert()
  const { error, isAuthenticated } = useSelector((state) => state.userReducer)
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
    lastName: '',
    email: '',
    password: '',
  })
  const { name, lastName, email, password } = user
  // Login
  const loginSubmit = (e) => {
    e.preventDefault()
    dispatch(login(loginEmail, loginPassword))
  }
  // // Forgot password
  // const forgotSubmit = (e) => {
  //   if (error) {
  //     alert.error(error)
  //     dispatch(clearErrors())
  //   }
  //   e.preventDefault()
  //   dispatch(forgotPassword(loginEmail))
  //   alert.success('Please check your email')
  // }
  // Register
  const registerSubmit = (e) => {
    e.preventDefault()
    const myForm = new FormData()
    myForm.set('name', name)
    myForm.set('lastName', lastName)
    myForm.set('email', email)
    myForm.set('password', password)
    dispatch(register(myForm))
  }
  // Taking input
  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (isAuthenticated) {
      navigate('/products')
    }
  }, [dispatch, alert, error, isAuthenticated, navigate])

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
      <Container
        maxWidth='xs'
        className='signin'
        sx={{ position: 'relative', top: '12vh' }}
      >
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
              className='button'
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={loginSubmit}
            >
              Login
            </Button>
            <Link href='/password/forgot'>Forgot password?</Link>
          </Box>
        </Box>
        <Box
          className='signUpForm'
          ref={registerTab}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 13,
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
                  label='First Name'
                  value={name}
                  onChange={registerDataChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  name='lastName'
                  label='Last Name'
                  value={lastName}
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
            </Grid>
            <Button
              className='button'
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={registerSubmit}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </Fragment>
  )
}

export default LoginRegister
