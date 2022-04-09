import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useSelector, useDispatch } from 'react-redux'
import { switchTheme } from '../../redux/actions/themeAction'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import './Header.css'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  // Mui settings
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  // Profile icon
  const { user, isAuthenticated } = useSelector((state) => state.userReducer)
  // Themes
  const dispatch = useDispatch()
  const themes = useSelector((state) => state.themeReducer)
  const navigate = useNavigate()

  return (
    <AppBar position='static'>
      <Container maxWidth='xl' className='Header'>
        <Toolbar disableGutters>
          <Typography
            className='ptsNav'
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 5, display: { xs: 'none', md: 'flex' } }}
          >
            PTS
          </Typography>
          {themes === 'light' ? (
            <DarkModeIcon onClick={() => dispatch(switchTheme())} />
          ) : (
            <LightModeIcon onClick={() => dispatch(switchTheme())} />
          )}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'grid', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign='center' onClick={() => navigate('/')}>
                  Home
                </Typography>
                <Typography
                  textAlign='center'
                  onClick={() => navigate('/products')}
                >
                  Products
                </Typography>
                <Typography textAlign='center' onClick={() => navigate('/')}>
                  Contact us
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            className='ptsNav'
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            PTS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => {
                navigate('/')
                handleCloseNavMenu()
              }}
              sx={{ my: 2, color: 'var(--text-primary)', display: 'block' }}
            >
              Home
            </Button>
            <Button
              onClick={() => {
                navigate('/products')
                handleCloseNavMenu()
              }}
              sx={{ my: 2, color: 'var(--text-primary)', display: 'block' }}
            >
              Products
            </Button>
            <Button
              onClick={() => {
                navigate('/')
                handleCloseNavMenu()
              }}
              sx={{ my: 2, color: 'var(--text-primary)', display: 'block' }}
            >
              Contact us
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0, mr: '3%', mb: '10px' }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ width: '54px' }}>
                {isAuthenticated === true ? (
                  <img
                    className='profileImg'
                    src={user?.avatar?.url}
                    alt={user.name}
                  />
                ) : (
                  <img
                    className='profileImg'
                    src='/assets/profile.png'
                    alt='login pic'
                  />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isAuthenticated === true ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: 'var(--text-primary)',
                      display: 'block',
                    }}
                  >
                    <a className='link' href='/account'>
                      Profile
                    </a>
                  </Button>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: 'var(--text-primary)',
                      display: 'block',
                    }}
                  >
                    <a className='link' href='/cart'>
                      Cart
                    </a>
                  </Button>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: 'var(--text-primary)',
                      display: 'block',
                    }}
                  >
                    <a className='link' href='/cart'>
                      Dashboard
                    </a>
                  </Button>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: 'var(--text-primary)',
                      display: 'block',
                    }}
                  >
                    <a className='link' href='/cart'>
                      Orders
                    </a>
                  </Button>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: 'var(--text-primary)',
                      display: 'block',
                    }}
                  >
                    <a className='link' href='/'>
                      Logout
                    </a>
                  </Button>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: 'var(--text-primary)',
                      display: 'block',
                    }}
                  >
                    <a className='link' href='/login'>
                      Login/Register
                    </a>
                  </Button>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
