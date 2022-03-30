import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getProductDetails,
  clearErrors,
} from '../../redux/actions/productDetailsAction'
import ReactStars from 'react-rating-stars-component'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import ReviewCard from '../reviewCard/ReviewCard'
import Loader from '../loading/Loader'
import { useAlert } from 'react-alert'
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import { addItemsToCart } from '../../redux/actions/cartAction'
import './ProductDetails.css'

const ProductDetails = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const alert = useAlert()
  const { product, loading, error } = useSelector(
    (state) => state.productDetailsReducer
  )
  // Cart
  const [quantity, setQuantity] = useState(1)
  const increaseQuantity = () => {
    if (product.quantity <= quantity) return
    const quant = quantity + 1
    setQuantity(quant)
  }
  const decreaseQuantity = () => {
    if (1 >= quantity) return
    const quant = quantity - 1
    setQuantity(quant)
  }
  const addToCartHandler = () => {
    dispatch(addItemsToCart(params.id, quantity))
    alert.success('Items added to cart')
  }
  // Getting details
  useEffect(() => {
    // error display using react-alert
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProductDetails(params.id))
  }, [dispatch, params.id, alert, error])
  if (loading) {
    return <Loader />
  }
  // Rating stars settings
  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    value: product?.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  }
  return (
    <Fragment>
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <Fragment>
        {product && (
          <Container className='CardDetails'>
            <Card>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Carousel className='Carousel'>
                    {product?.images?.map((item, i) => (
                      <img
                        className='CarouselImage'
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                  </Carousel>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardContent>
                    <Typography variant='h6'>{product?.name}</Typography>
                    <Typography variant='caption'>
                      Product #{product?._id}
                    </Typography>
                    <Typography variant='body2'>
                      {product?.description?.about}
                    </Typography>
                    <ReactStars {...options} />
                    <Typography variant='caption'>
                      ({product?.numOfReviews} Reviews)
                    </Typography>
                    <Typography variant='body1'>{`${product?.price}SEK`}</Typography>
                    <RemoveCircleIcon onClick={decreaseQuantity} />
                    <input
                      className='quantity'
                      readOnly
                      type='number'
                      value={quantity}
                    />
                    <AddCircleIcon onClick={increaseQuantity} />
                    <Button
                      className='button'
                      variant='contained'
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                    <Box>
                      <Typography variant='subtitle'>
                        Status:
                        <Typography
                          variant='subtitle'
                          className={
                            product?.quantity < 1 ? 'redColor' : 'greenColor'
                          }
                        >
                          {product?.quantity < 1 ? 'OutOfStock' : 'InStock'}
                        </Typography>
                      </Typography>
                    </Box>
                    {/* Features */}
                    <Typography variant='subtitle'>Features:</Typography>
                    {product.description.features &&
                      product?.description.features.map((feature, i) => (
                        <Typography variant='body2'>{feature}</Typography>
                      ))}
                    <Button className='button' variant='contained'>
                      Submit Review
                    </Button>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
            {/* Reviews */}
            {product.reviews && product.reviews[0] ? (
              <div>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
              </div>
            ) : (
              <p>No Reviews Yet</p>
            )}
          </Container>
        )}
      </Fragment>
    </Fragment>
  )
}

export default ProductDetails
