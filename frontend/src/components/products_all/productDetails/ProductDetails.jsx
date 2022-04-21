import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getProductDetails,
  clearErrors,
} from '../../../redux/actions/productDetailsAction'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import ReviewCard from '../reviewCard/ReviewCard'
import Loader from '../../layout/loading/Loader'
import { useAlert } from 'react-alert'
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { Rating } from '@material-ui/lab'
import Carousel from 'react-material-ui-carousel'
import { addItemsToCart } from '../../../redux/actions/cartAction'
import { newReview } from '../../../redux/actions/reviewAction'
import './ProductDetails.css'

const ProductDetails = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const alert = useAlert()
  // For Review
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const { success, error: reviewError } = useSelector(
    (state) => state.newReviewReducer
  )
  const { product, loading, error } = useSelector(
    (state) => state.productDetailsReducer
  )
  const { cartItems } = useSelector((state) => state.cartReducer)
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
    alert.success('Item added to cart')
  }
  // Getting details
  useEffect(() => {
    // error display using react-alert
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (reviewError) {
      alert.error(reviewError)
      dispatch(clearErrors())
    }
    if (success) {
      alert.success('Review Submitted Successfully')
      dispatch({ type: 'NEW_REVIEW_RESET' })
    }
    dispatch(getProductDetails(params.id))
  }, [dispatch, params.id, alert, error, reviewError, success])

  if (loading) {
    return <Loader />
  }
  // For Review
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true)
  }
  const reviewSubmitHandler = () => {
    const myForm = new FormData()
    myForm.set('rating', rating)
    myForm.set('comment', comment)
    myForm.set('productId', params.id)
    dispatch(newReview(myForm))
    setOpen(false)
  }
  // Rating stars settings
  const options = {
    edit: false,
    value: product?.rating,
    readOnly: true,
    precision: 0.5,
    size: 'medium',
  }

  return (
    <Fragment>
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <Fragment>
        {product && (
          <Container
            className='CardDetails'
            sx={{
              position: 'relative',
              top: '12vh',
            }}
          >
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
                  <CardContent sx={{ textAlign: 'justify' }}>
                    <Typography variant='h6'>{product?.name}</Typography>
                    <Typography variant='caption'>
                      Product #{product?._id}
                    </Typography>
                    <Typography variant='body2'>
                      {product?.description?.about}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                      <Rating {...options} />
                      <Typography variant='caption' sx={{ paddingTop: '3px' }}>
                        ({product?.numOfReviews} Reviews)
                      </Typography>
                    </Box>
                    <Typography variant='body1'>{`${product?.price}SEK`}</Typography>
                    <Box sx={{ display: 'flex' }}>
                      <RemoveCircleIcon onClick={decreaseQuantity} />
                      <Typography
                        variant='caption'
                        sx={{
                          border: '2px solid black',
                          height: '18px',
                          width: '15px',
                          paddingLeft: '4px',
                        }}
                      >
                        {quantity}
                      </Typography>
                      <AddCircleIcon onClick={increaseQuantity} />{' '}
                      {cartItems
                        .map((item) => item.product)
                        .includes(product._id) ? (
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
                          disabled={product.stock < 1 ? true : false}
                          className='button'
                          variant='contained'
                          onClick={addToCartHandler}
                          size='small'
                          sx={{ marginLeft: '10px' }}
                        >
                          Add to Cart
                        </Button>
                      )}
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontWeight: 'bold' }}
                        variant='subtitle2'
                        className={
                          product?.quantity < 1 ? 'redColor' : 'greenColor'
                        }
                      >
                        {product?.quantity < 1 ? 'OutOfStock' : 'InStock'}
                      </Typography>
                    </Box>
                    <Box>
                      {/* Features */}
                      <Typography variant='subtitle2'>Features:</Typography>
                      {product.description.features &&
                        product?.description.features.map((feature, i) => (
                          <Typography variant='caption'> {feature}</Typography>
                        ))}
                    </Box>
                  </CardContent>
                  <Button
                    onClick={submitReviewToggle}
                    className='button'
                    variant='contained'
                    size='small'
                    sx={{ marginLeft: '15px' }}
                  >
                    Submit Review
                  </Button>
                </Grid>
              </Grid>
            </Card>
            <Dialog
              aria-labelledby='simple-dialog-title'
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className='submitDialog'>
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size='large'
                />
                <textarea
                  className='submitDialogTextArea'
                  cols='30'
                  rows='5'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color='secondary'>
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color='primary'>
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
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
