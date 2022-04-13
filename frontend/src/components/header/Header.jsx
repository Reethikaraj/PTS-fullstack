import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useSelector, useDispatch } from 'react-redux'
import { switchTheme } from '../../redux/actions/themeAction'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {
  // Profile icon
  const { user, isAuthenticated } = useSelector((state) => state.userReducer)
  // Themes
  const dispatch = useDispatch()
  const themes = useSelector((state) => state.themeReducer)
  const navigate = useNavigate()
  console.log(user)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          position: 'fixed',
          top: '0vh',
          width: '100%',
        }}
      >
        <Toolbar className='header'>
          <Box sx={{ flexGrow: 2 }}>
            {isAuthenticated === true ? (
              <Box>
                <img
                  src={user?.avatar?.url}
                  alt=''
                  onClick={() => navigate('/account')}
                />
                <span>{user.name}</span>
              </Box>
            ) : (
              <Box className='tooltip'>
                <img
                  className='profileImg'
                  src='/assets/profile.png'
                  alt='login pic'
                  onClick={() => navigate('/login')}
                />
                <span className='tooltiptext'>Login</span>
              </Box>
            )}
          </Box>
          <Box className='tooltip' sx={{ flexGrow: 2 }}>
            <Typography variant='h6' component='div' className='ptsNav'>
              PTS
            </Typography>
            {/* <span className='tooltiptext pts'>Pradha Trinkets Store</span> */}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 0.9 }}>
            <Box className='tooltip'>
              {themes === 'light' ? (
                <DarkModeIcon
                  onClick={() => dispatch(switchTheme())}
                  className='icon'
                />
              ) : (
                <LightModeIcon
                  onClick={() => dispatch(switchTheme())}
                  className='icon'
                />
              )}
              <span className='tooltiptext'>Theme</span>
            </Box>
            <Box className='tooltip'>
              <FavoriteIcon
                className='icon'
                onClick={() => navigate('/wishlist')}
              />
              <span className='tooltiptext'>Favorites</span>
            </Box>
            <Box className='tooltip'>
              <ShoppingCartIcon
                className='icon'
                onClick={() => navigate('/cart')}
              />
              <span className='tooltiptext'>Cart</span>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default Header
