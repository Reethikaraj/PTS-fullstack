import React, { Fragment } from 'react'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { Grid, Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useSelector, useDispatch } from 'react-redux'
import {
  addItemsToCart,
  removeItemsFromCart,
} from '../../../redux/actions/cartAction'
import { addToWishList } from '../../../redux/actions/wishListAction'
import MetaData from '../../MetaData'
import './Cart.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'

const Cart = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.userReducer)
  const { cartItems } = useSelector((state) => state.cartReducer)
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1
    if (stock <= quantity) return
    dispatch(addItemsToCart(id, newQty))
  }
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1
    if (1 >= quantity) return
    dispatch(addItemsToCart(id, newQty))
  }
  const checkoutHandler = () => {
    isAuthenticated === true ? navigate('/shipping') : navigate('/login')
    alert.error('Please login to place the order')
  }
  // console.log('cartItems', cartItems)
  return (
    <Fragment>
      <MetaData title='PTS - Cart' />
      {cartItems.length === 0 ? (
        <div className='emptyCart'>
          <RemoveShoppingCartIcon />
          <Typography>No items in Your Cart</Typography>
          <Link to='/products'>View products</Link>
        </div>
      ) : (
        <Fragment>
          <Grid
            container
            justifyContent='space-evenly'
            alignItems='center'
            gap={0.5}
            sx={{
              position: 'relative',
              top: '10.5vh',
              justifyContent: 'center',
              paddingBottom: '10vh',
            }}
          >
            <Typography variant='h6'>
              {isAuthenticated === true ? `${user.name}'s cart` : 'Cart'}
            </Typography>
            <Grid
              container
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{ padding: '10px', justifyContent: 'center' }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography variant='body1'>Gross Total: </Typography>
                  <Typography variant='body1'>{`${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}SEK`}</Typography>
                </Box>
                <Button className='button' onClick={checkoutHandler}>
                  Check Out
                </Button>
              </Box>
            </Grid>
            {cartItems &&
              cartItems.map((item) => (
                <Grid container lg={3} md={4} sm={6} xs={12}>
                  <Card
                    sx={{
                      margin: '10px 0',
                      width: '300px',
                      height: '170px',
                      padding: '10px',
                    }}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ padding: '5px' }}>
                        <CardMedia
                          component='img'
                          className='cartImg'
                          height='120px'
                          // width='83.5px'
                          image={item.image}
                          alt='item'
                        />
                        <Button
                          className='button'
                          size='small'
                          variant='contained'
                          sx={{
                            marginTop: '5px',
                            fontSize: 'x-small',
                            paddinf: '5px',
                          }}
                          onClick={(id) => {
                            dispatch(removeItemsFromCart(item.product))
                            dispatch(() =>
                              dispatch(addToWishList(item.product))
                            )
                          }}
                        >
                          Save for later
                        </Button>
                      </Box>
                      <Box sx={{ paddingLeft: '12px' }}>
                        <CardContent sx={{ padding: '0' }}>
                          <Typography
                            gutterBottom
                            variant='subtitle2'
                            component='div'
                            sx={{ height: '44px' }}
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            variant='subtitle2'
                            sx={{ flexGrow: 0.5 }}
                          >
                            {item.price} SEK
                          </Typography>
                          <div className='cartInput'>
                            <button
                              onClick={() =>
                                decreaseQuantity(item.item, item.quantity)
                              }
                            >
                              -
                            </button>
                            <input
                              type='number'
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              onClick={() =>
                                increaseQuantity(
                                  item.item,
                                  item.stock,
                                  item.quantity
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <Button
                            className='button'
                            size='small'
                            variant='contained'
                            sx={{ marginTop: '5px', fontSize: 'x-small' }}
                            onClick={(id) => {
                              dispatch(removeItemsFromCart(item.product))
                            }}
                          >
                            Remove
                          </Button>
                        </CardContent>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Cart
