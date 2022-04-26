import React, { Fragment } from 'react'
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromWishList } from '../../redux/actions/wishListAction'
import MetaData from '../MetaData'
import { addItemsToCart } from '../../redux/actions/cartAction'
import './WishList.css'
const WishList = () => {
  const dispatch = useDispatch()
  const { wishList } = useSelector((state) => state.wishListReducer)
  const { isAuthenticated, user } = useSelector((state) => state.userReducer)
  return (
    <Fragment>
      <MetaData title='PTS - Wishlist' />
      {wishList.length === 0 ? (
        <div className='emptyCart'>
          <Typography>No items in Wishlist</Typography>
          <Link to='/products'>View products</Link>
        </div>
      ) : (
        <Grid
          container
          sx={{
            position: 'relative',
            top: '10.5vh',
            justifyContent: 'center',
            paddingBottom: '10vh',
          }}
        >
          <Grid lg={12} md={12} sm={12} xs={12}>
            <Typography
              variant='h5'
              sx={{ textAlign: 'center', marginBottom: '20px' }}
            >
              {isAuthenticated === true
                ? `${user?.name}'s WishList`
                : 'Wishlist'}
            </Typography>
          </Grid>
          {wishList?.map((item) => (
            <Grid container lg={3} md={4} sm={6} xs={12}>
              <Card sx={{ margin: '10px 0', width: '300px', height: '170px' }}>
                <Box sx={{ display: 'flex', padding: ' 5px' }}>
                  <Box sx={{ padding: '10px 0' }}>
                    <CardMedia
                      component='img'
                      height='120'
                      image={item?.image}
                      alt='item'
                    />
                  </Box>
                  <Box sx={{ padding: '0' }}>
                    <CardContent sx={{ padding: '0 10px' }}>
                      <Typography
                        gutterBottom
                        variant='subtitle2'
                        component='div'
                        sx={{ height: '44px' }}
                      >
                        {item?.name}
                      </Typography>
                      <Typography variant='subtitle2' sx={{ flexGrow: 0.5 }}>
                        {item?.price} SEK
                      </Typography>
                      <Button
                        className='button'
                        size='small'
                        variant='contained'
                        sx={{ margin: '5px 0' }}
                        onClick={(id) => {
                          dispatch(removeFromWishList(item.product))
                        }}
                      >
                        Remove
                      </Button>
                      <Button
                        className='button'
                        size='small'
                        variant='contained'
                        onClick={(id) => {
                          dispatch(removeFromWishList(item.product))
                          dispatch(addItemsToCart(item.product, 1))
                        }}
                      >
                        Move to Cart
                      </Button>
                    </CardContent>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Fragment>
  )
}

export default WishList
