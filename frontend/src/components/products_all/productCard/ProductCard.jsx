import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material'
import { Rating } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { addItemsToCart } from '../../../redux/actions/cartAction'
import {
  addToWishList,
  removeFromWishList,
} from '../../../redux/actions/wishListAction'
import './ProductCard.css'
const Product = ({ product }) => {
  // Rating stars settings
  const options = {
    edit: false,
    value: product?.rating,
    readOnly: true,
    precision: 0.5,
    size: 'small',
  }
  const dispatch = useDispatch()
  const alert = useAlert()
  const { wishList } = useSelector((state) => state.wishListReducer)
  const { cartItems } = useSelector((state) => state.cartReducer)
  const addToCartHandler = () => {
    dispatch(addItemsToCart(product._id, 1))
    alert.success('Item added to cart')
  }
  const addToWishListHandler = () => {
    console.log('id', product._id)
    dispatch(addToWishList(product._id))
    alert.success('Item added to Wishlist')
  }
  const RemoveWishListHandler = () => {
    dispatch(removeFromWishList(product._id))
    alert.success('Item Removed from  Wishlist')
  }
  return (
    <Fragment>
      <Box>
        <Card className='card' sx={{ margin: '1vh' }}>
          <Link to={`/product/${product._id}`}>
            <CardMedia
              component='img'
              // height='160px'
              image={product.images[0].url}
              alt='Product'
            />
          </Link>
          <CardContent sx={{ padding: '0 0 0 5px' }}>
            <Typography
              gutterBottom
              variant='subtitle2'
              component='div'
              sx={{ height: '45px' }}
            >
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Rating {...options} />
              <Typography variant='caption'>
                ({product.numOfReviews})
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography variant='subtitle2' sx={{ flexGrow: 0.5 }}>
                {product.price} SEK
              </Typography>
              {wishList?.map((item) => item.product).includes(product._id) ? (
                <FavoriteIcon
                  className='heartIcon'
                  onClick={RemoveWishListHandler}
                />
              ) : (
                <FavoriteBorderIcon
                  className='heartIcon'
                  onClick={addToWishListHandler}
                />
              )}
            </Box>
          </CardContent>
          <CardActions>
            {cartItems.map((item) => item.product).includes(product._id) ? (
              <Button
                className='button'
                size='small'
                variant='contained'
                onClick={addToCartHandler}
              >
                Item in Cart
              </Button>
            ) : (
              <Button
                className='button'
                size='small'
                variant='contained'
                onClick={addToCartHandler}
              >
                Add to cart
              </Button>
            )}
          </CardActions>
        </Card>
      </Box>
    </Fragment>
  )
}

export default Product
