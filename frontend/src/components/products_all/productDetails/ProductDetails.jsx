import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
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
import { addItemsToCart } from '../../../redux/actions/cartAction'
import { newReview } from '../../../redux/actions/reviewAction'
import Carousel from 'react-material-ui-carousel'
import MetaData from '../../MetaData'
import './ProductDetails.css'

const ProductDetails = () => {
  const params = useParams()
  const navigate = useNavigate()
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
  const { isAuthenticated } = useSelector((state) => state.userReducer)
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
    isAuthenticated === true
      ? open
        ? setOpen(false)
        : setOpen(true)
      : navigate('/login')
    // alert.error('Please login to submit review')
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
    size: 'small',
  }

  return (
    <Fragment>
      <MetaData title='PTS - Pradha Trinkets store' />
      {product && (
        <Container
          className='CardDetails'
          sx={{
            height: '120%',
            position: 'relative',
            top: '10.5vh',
            paddingBottom: '10vh',
          }}
        >
          <Card sx={{ padding: '1%' }}>
            <Grid container sx={{ justifyContent: 'center' }}>
              <Grid lg={12} md={12} sm={12} xs={12}>
                <Box sx={{ margin: '2% 30%' }}>
                  <Button
                    className='button'
                    size='small'
                    variant='contained'
                    onClick={() => navigate('/products')}
                  >
                    Back to all products
                  </Button>
                </Box>
              </Grid>
              <Grid
                item
                sm={6}
                lg={6}
                md={6}
                xs={12}
                sx={{ alignItems: 'center' }}
              >
                <Box className='productdetailsCarousel'>
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
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={6} md={6}>
                <CardContent sx={{ textAlign: 'left' }}>
                  <Typography variant='h6'>{product?.name}</Typography>
                  <Typography variant='caption'>
                    Product #{product?._id}
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{ fontWeight: 'bold' }}
                  >{`${product?.price}SEK`}</Typography>
                  <Typography variant='body2' sx={{ marginLeft: '0' }}>
                    {product?.description?.about}
                  </Typography>
                  <Box sx={{ display: 'flex' }}>
                    <Rating {...options} />
                    <Typography variant='caption'>
                      ({product?.numOfReviews} Reviews)
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', margin: '5px 0' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexGrow: 0.1,
                        marginTop: '8px',
                      }}
                    >
                      <RemoveCircleIcon
                        onClick={decreaseQuantity}
                        sx={{ flexGrow: 0.1 }}
                      />
                      <Box
                        sx={{
                          flexGrow: 0.1,
                          border: '2px solid black',
                          height: '18px',
                          width: '20px',
                        }}
                      >
                        <Typography
                          variant='caption'
                          sx={{
                            paddingLeft: '8px',
                          }}
                        >
                          {quantity}
                        </Typography>
                      </Box>
                      <AddCircleIcon
                        onClick={increaseQuantity}
                        sx={{ flexGrow: 0.1 }}
                      />
                    </Box>
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
                  <Box sx={{ textAlign: 'justify', lineHeight: 1 }}>
                    {/* Features */}
                    <Typography variant='subtitle2'>Features:</Typography>
                    {product.description.features &&
                      product?.description.features.map((feature, i) => (
                        <Typography variant='caption'>{feature}</Typography>
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
                  Add Review
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
            <Grid container>
              {product.reviews &&
                product.reviews.map((review) => (
                  <Grid lg={6} md={6} sm={6} xs={12}>
                    <ReviewCard key={review._id} review={review} />
                  </Grid>
                ))}
            </Grid>
          ) : (
            <p>No Reviews Yet</p>
          )}
        </Container>
      )}
    </Fragment>
  )
}

export default ProductDetails
