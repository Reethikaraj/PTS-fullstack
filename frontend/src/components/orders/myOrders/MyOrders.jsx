import React, { useEffect } from 'react'
import { Container, Card, Typography, Grid, Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { clearErrors, myOrders } from '../../../redux/actions/orderAction'
import './MyOrders.css'

const MyOrders = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { error, orders } = useSelector((state) => state.myOrdersReducer)
  const { user } = useSelector((state) => state.userReducer)
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(myOrders())
  }, [dispatch, alert, error])

  return (
    <Container
      sx={{
        position: 'relative',
        top: '11vh',
        height: '120%',
        paddingBottom: '100px',
      }}
    >
      <Typography variant='h6' sx={{ textAlign: 'center' }}>
        {user.name}'s orders
      </Typography>
      <Grid container gap={1} sx={{ justifyContent: 'space-evenly' }}>
        {orders?.map((order) => (
          <Link className='link' to={`/order/${order._id}`}>
            <Grid lg={3} md={4} sm={8} xs={12}>
              <Card sx={{ padding: '10px', width: '250px', height: '250px' }}>
                <Typography variant='body1' color='text.secondary' gutterBottom>
                  Order no: {order._id}
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    sx={{ flexGrow: 0.1 }}
                    variant='body2'
                    component='div'
                  >
                    Order Status:
                  </Typography>
                  {order.orderStatus === 'Delivered' ? (
                    <Typography variant='body2' component='div' color='green'>
                      {order.orderStatus}
                    </Typography>
                  ) : (
                    <Typography variant='body2' component='div' color='red'>
                      {order.orderStatus}
                    </Typography>
                  )}
                </Box>
                <Typography variant='body2' color='text.secondary'>
                  No. of items: {order.orderItems.length}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Amount paid: {order.totalPrice} sek
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Placed at: {order.createdAt}
                </Typography>
                <Typography variant='body2'>
                  Shipping adress:
                  <br />
                  {order.shippingInfo.address}
                  <br />
                  {order.shippingInfo.city}
                  <br />
                  {order.shippingInfo.country}
                  <br />
                  {order.shippingInfo.pinCode}
                  <br />
                  {order.shippingInfo.phoneNo}
                  <br />
                </Typography>
              </Card>
            </Grid>
          </Link>
        ))}
      </Grid>
    </Container>
  )
}

export default MyOrders
