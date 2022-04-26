import React, { Fragment, useRef, useEffect } from 'react'
import CheckoutSteps from '../checkoutSteps/CheckoutSteps'
import { useSelector } from 'react-redux'
import MetaData from '../../MetaData'
import { Typography } from '@material-ui/core'
import { useAlert } from 'react-alert'
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import './Payment.css'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import EventIcon from '@mui/icons-material/Event'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import { useDispatch } from 'react-redux'
import { clearCart } from '../../../redux/actions/cartAction'
import { clearErrors, createOrder } from '../../../redux/actions/orderAction'

const Payment = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alert = useAlert()
  const { shippingInfo, cartItems } = useSelector((state) => state.cartReducer)
  const { user } = useSelector((state) => state.userReducer)
  const { error } = useSelector((state) => state.newOrderReducer)
  // Fetching details from session storage
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
  // STRIPE
  const payBtn = useRef(null)
  const paymentData = {
    // amount: Math.round(orderInfo.totalPrice),
    amount: orderInfo.totalPrice * 100,
  }
  // Req.body for creating order
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.tax,
    totalPrice: orderInfo.totalPrice,
  }
  const stripe = useStripe()
  const elements = useElements()
  const submitHandler = async (e) => {
    e.preventDefault()
    payBtn.current.disabled = true
    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        'https://pradha-backend.herokuapp.com/api/v1/payment/process',
        paymentData,
        config
      )
      const client_secret = data.client_secret
      // console.log('data', data)
      if (!stripe || !elements) return
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              country: shippingInfo.country,
            },
          },
        },
      })
      if (result.error) {
        payBtn.current.disabled = false
        alert.error(result.error.message)
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          // Creating order
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }
          dispatch(createOrder(order))
          dispatch(clearCart())
          // Navigating to /success
          navigate('/success')
        } else {
          alert.error('There was some issue while processing payment.')
        }
      }
    } catch (error) {
      payBtn.current.disabled = false
      alert.error(error.response.data.message)
      console.log('error', error)
    }
  }
  // Error in order reducer
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, error, alert])

  return (
    <Fragment>
      <MetaData title='PTS - Payment' />
      <Container
        sx={{ position: 'relative', top: '11vh', paddingBottom: '10vh' }}
      >
        <CheckoutSteps activeStep={2} />
        <div className='paymentContainer'>
          <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
            <Typography>Card Info</Typography>
            <div>
              <CreditCardIcon />
              <CardNumberElement className='paymentInput' />
            </div>
            <div>
              <EventIcon />
              <CardExpiryElement className='paymentInput' />
            </div>
            <div>
              <VpnKeyIcon />
              <CardCvcElement className='paymentInput' />
            </div>

            <input
              type='submit'
              value={`Pay - ${orderInfo && orderInfo.totalPrice} SEK`}
              ref={payBtn}
              className='paymentFormBtn'
            />
            <div>
              <button
                className='paymentFormBtn'
                onClick={() => navigate('/order/confirm')}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </Container>
    </Fragment>
  )
}

export default Payment
