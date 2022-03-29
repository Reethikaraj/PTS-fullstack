import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { ListItemButton } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import FaceIcon from '@mui/icons-material/Face'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { switchTheme } from '../../redux/actions/themeAction'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import UserOptions from '../userDashboard/UserOptions'
import './Header.css'

const drawerWidth = 240
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function PersistentDrawerLeft() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const { isAuthenticated, user } = useSelector((state) => state.userReducer)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  // Themes
  const dispatch = useDispatch()
  const themes = useSelector((state) => state.themeReducer.theme)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar className='Header'>
          <Typography variant='h6' noWrap component='div' className='ptsNav'>
            PTS
          </Typography>

          {isAuthenticated && <UserOptions user={user} />}

          {themes === 'light' ? (
            <DarkModeIcon onClick={() => dispatch(switchTheme())} />
          ) : (
            <LightModeIcon onClick={() => dispatch(switchTheme())} />
          )}

          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ ml: 'auto', ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='right'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronRightIcon className='Icon' />
            ) : (
              <ChevronLeftIcon className='Icon' />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List className='Icon' onClick={handleDrawerClose}>
          <Link className='link' to={'/'}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon className='Icon' />
                </ListItemIcon>
                <ListItemText primary='Home' />
              </ListItemButton>
            </ListItem>
          </Link>

          <ListItem disablePadding>
            <Link className='link' to={'/products'} onClick={handleDrawerClose}>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingBagIcon className='Icon' />
                </ListItemIcon>
                <ListItemText primary='Products' />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding onClick={handleDrawerClose}>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon className='Icon' />
              </ListItemIcon>
              <ListItemText primary='Cart' />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List className='Icon' onClick={handleDrawerClose}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FaceIcon className='Icon' />
              </ListItemIcon>
              <ListItemText primary='Login' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={handleDrawerClose}>
            <ListItemButton>
              <ListItemIcon>
                <HowToRegIcon className='Icon' />
              </ListItemIcon>
              <ListItemText primary='Register' />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List className='Icon' onClick={handleDrawerClose}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ConnectWithoutContactIcon className='Icon' />
              </ListItemIcon>
              <ListItemText primary='Contact Us' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  )
}
