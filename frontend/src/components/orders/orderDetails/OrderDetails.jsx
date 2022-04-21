import React, { useEffect } from 'react'
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
} from '@mui/material'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../../../redux/actions/orderAction'

const OrderDetails = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { order } = useSelector((state) => state.orderDetailsReducer)
  useEffect(() => {
    dispatch(getOrderDetails(params.id))
  }, [dispatch, params])
  return (
    <Container
      sx={{
        position: 'relative',
        top: '12vh',
        height: '120%',
        paddingBottom: '70px',
      }}
    >
      <CardContent>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          Order no: {order?._id}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Placed at: {order?.createdAt}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Total Price: {order?.totalPrice} sek
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ flexGrow: 0.01 }} variant='body2' component='div'>
            Order Status:
          </Typography>
          {order?.orderStatus === 'Delivered' ? (
            <Typography variant='body2' component='div' color='green'>
              {order?.orderStatus}
            </Typography>
          ) : (
            <Typography variant='body2' component='div' color='red'>
              {order?.orderStatus}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='body1'>User Details:</Typography>
          <Typography variant='body2' color='text.secondary'>
            Name: {order?.user.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            email: {order?.user.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='body1'>Shipping adress:</Typography>
          <Typography variant='body2' color='text.secondary'>
            Adress: {order?.shippingInfo.address}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            City: {order?.shippingInfo.city}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Country: {order?.shippingInfo.country}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Pin code: {order?.shippingInfo.pinCode}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Phone: {order?.shippingInfo.phoneNo}
          </Typography>
        </Box>
        <Typography variant='body2' color='text.secondary'>
          No. of items: {order?.orderItems.length}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='body1'>Item Details:</Typography>
          <Typography variant='body2' color='text.secondary'>
            No. of items: {order?.orderItems?.length}
          </Typography>
          <Grid container gap={1}>
            {order?.orderItems.map((item) => (
              <Grid lg={2} md={4} sm={6} xs={12}>
                <Link className='link' to={`/product/${item?.product}`}>
                  <Card
                    sx={{ maxWidth: 345, height: '220px', padding: '10px' }}
                  >
                    <CardMedia
                      component='img'
                      height='140'
                      image={item.image}
                      alt='product'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='body1' component='div'>
                        {item.name}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Price: {item.price}sek
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Container>
  )
}

export default OrderDetails
