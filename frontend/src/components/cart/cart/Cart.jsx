import React, { Fragment } from 'react'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import {
  addItemsToCart,
  removeItemsFromCart,
} from '../../../redux/actions/cartAction'
import { addToWishList } from '../../../redux/actions/wishListAction'
import './Cart.css'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.userReducer)
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
  }
  // console.log('cartItems', cartItems)
  return (
    <Fragment>
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
              // height: '120vh',
              marginLeft: '0.5%',
              position: 'relative',
              top: '11vh',
            }}
          >
            <Grid
              container
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{ padding: '10px', justifyContent: 'center' }}
            >
              <Box sx={{ display: 'flex' }}>
                <Typography variant='h6'>Gross Total: </Typography>
                <Typography variant='h6'>{`${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}SEK`}</Typography>
              </Box>
              <Grid
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{ justifyContent: 'center' }}
              >
                <Button className='button' onClick={checkoutHandler}>
                  Check Out
                </Button>
              </Grid>
            </Grid>
            {cartItems &&
              cartItems.map((item) => (
                <Grid container lg={3} md={4} sm={6} xs={12}>
                  <Card
                    sx={{ margin: '10px 0', width: '250px', height: '150px' }}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <Box>
                        <CardMedia
                          component='img'
                          height='100'
                          image={item.image}
                          alt='item'
                        />
                        <Button
                          className='button'
                          size='small'
                          variant='contained'
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
                      <Box>
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant='subtitle2'
                            component='div'
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
