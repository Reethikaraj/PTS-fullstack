import React from 'react'
import { Box } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import WorkIcon from '@mui/icons-material/Work'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Footer.css'

const Footer = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.userReducer)

  return (
    <footer>
      <Box
        className='Footer'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 2,
          position: 'fixed',
          bottom: '0vh',
          width: '100%',
          zIndex: 3,
        }}
      >
        <Box className='tooltip'>
          <HomeIcon className='icon' onClick={() => navigate('/')} />
          <span className='tooltiptext'>Home</span>
        </Box>
        <Box className='tooltip'>
          <AddShoppingCartIcon
            className='icon'
            onClick={() => navigate('/products')}
          />
          <span className='tooltiptext'>Products</span>
        </Box>
        {isAuthenticated === true ? (
          <Box className='tooltip'>
            <WorkIcon className='icon' onClick={() => navigate('/orders')} />
            <span className='tooltiptext'>Orders</span>
          </Box>
        ) : (
          ''
        )}

        <Box className='tooltip'>
          <ContactPhoneIcon
            className='icon'
            onClick={() => navigate('/contact')}
          />
          <span className='tooltiptext'>Contact</span>
        </Box>
        {isAuthenticated === true && user.role === 'admin' ? (
          <Box className='tooltip'>
            <DashboardIcon
              className='icon'
              onClick={() => navigate('/admin')}
            />
            <span className='tooltiptext'>Admin</span>
          </Box>
        ) : (
          ''
        )}
      </Box>
    </footer>
  )
}

export default Footer
