import React, { useEffect } from 'react'
import { Container, Card, CardContent, Typography, Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { clearErrors, myOrders } from '../../../redux/actions/orderAction'

const MyOrders = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, orders } = useSelector((state) => state.myOrdersReducer)
  console.log('orders', orders)
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
        top: '12vh',
      }}
    >
      <h1>My Orders</h1>
      <Grid container gap={1} sx={{ justifyContent: 'space-evenly' }}>
        {orders?.map((order) => (
          <Grid lg={3} md={4} sm={8} xs={12}>
            <Card sx={{ padding: '10px' }}>
              <Typography variant='h6' color='text.secondary' gutterBottom>
                Order no: {order._id}
              </Typography>
              <Typography variant='body2' component='div'>
                Order status: {order.orderStatus}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                No. of items: {order.orderItems.length}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color='text.secondary'>
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
        ))}
      </Grid>
    </Container>
  )
}

export default MyOrders
