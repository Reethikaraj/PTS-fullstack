import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
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
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { addItemsToCart } from '../../redux/actions/cartAction'
import {
  addToWishList,
  removeFromWishList,
} from '../../redux/actions/wishListAction'
import './ProductCard.css'
const Product = ({ product }) => {
  // Rating stars settings
  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    value: product.rating,
    isHalf: true,
    size: 18,
  }
  const dispatch = useDispatch()
  const alert = useAlert()
  const { itemExists } = useSelector((state) => state.wishListReducer)
  const addToCartHandler = () => {
    dispatch(addItemsToCart(product._id, 1))
    alert.success('Item added to cart')
  }
  const addToWishListHandler = () => {
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
        <Card className='card' sx={{ width: 150, height: 350, margin: '5px' }}>
          <Link to={`/product/${product._id}`}>
            <CardMedia
              component='img'
              height='180'
              image={product.images[0].url}
              alt='Product'
            />
          </Link>
          <CardContent>
            <Typography gutterBottom variant='subtitle2' component='div'>
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <ReactStars {...options} />
              <Typography variant='caption' sx={{ paddingTop: '5px' }}>
                ({product.numOfReviews})
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography variant='subtitle2' sx={{ flexGrow: 0.5 }}>
                {product.price} SEK
              </Typography>

              {itemExists === true ? (
                <FavoriteIcon onClick={RemoveWishListHandler} />
              ) : (
                <FavoriteBorderIcon
                  onClick={addToWishListHandler}
                  className='icon'
                />
              )}
            </Box>
          </CardContent>
          <CardActions>
            <Button
              className='button'
              size='small'
              variant='contained'
              onClick={addToCartHandler}
            >
              Add to cart
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Fragment>
  )
}

export default Product
