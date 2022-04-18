import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useSelector, useDispatch } from 'react-redux'
import { switchTheme } from '../../redux/actions/themeAction'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/actions/userAction'
import './Header.css'
import { Button } from '@mui/material'

const Header = () => {
  // Profile icon
  const { user, isAuthenticated } = useSelector((state) => state.userReducer)
  // Themes
  const dispatch = useDispatch()
  const themes = useSelector((state) => state.themeReducer)
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cartReducer)
  // For User options
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  // Logout
  function logoutUser() {
    dispatch(logout())
    alert.success('Logout Successfully')
  }
  // console.log('user', user)
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
                <Button
                  id='basic-button'
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <img
                    // src={user?.avatar?.url}
                    className='profileImg'
                    src='/assets/profile.png'
                    alt=''
                  />
                </Button>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem
                    onClick={() => (navigate('/account'), handleClose())}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => (
                      navigate('/products'), logoutUser(), handleClose()
                    )}
                  >
                    Logout
                  </MenuItem>
                </Menu>
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
              <Box sx={{ display: 'flex' }}>
                <ShoppingCartIcon
                  className='icon'
                  onClick={() => navigate('/cart')}
                />
                <span className='cartLength'>{cartItems?.length}</span>
              </Box>
              <span className='tooltiptext'>Cart</span>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default Header
