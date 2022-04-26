import React from 'react'
import './OrderSuccess.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Typography } from '@material-ui/core'
import MetaData from '../../MetaData'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <div className='orderSuccess'>
      <MetaData title='PTS - Order success' />
      <CheckCircleIcon />
      <Typography>Your Order has been Placed successfully </Typography>
      <Link to='/orders'>View Orders</Link>
    </div>
  )
}

export default OrderSuccess
