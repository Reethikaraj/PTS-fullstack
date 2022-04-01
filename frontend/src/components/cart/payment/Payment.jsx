import React, { Fragment, useEffect, useRef, useState } from 'react'
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
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import './Payment.css'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import EventIcon from '@mui/icons-material/Event'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import { useNavigate } from 'react-router-dom'
// import { createOrder, clearErrors } from '../../../redux/actions/';

const Payment = () => {
  const navigate = useNavigate()
  const alert = useAlert()
  const { shippingInfo, cartItems } = useSelector((state) => state.cartReducer)
  const { user } = useSelector((state) => state.userReducer)
  // Fetching details from session storage
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
  const payBtn = useRef(null)
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice),
  }
  const stripe = useStripe()
  const elements = useElements()
  const submitHandler = async (e) => {
    e.preventDefault()
    payBtn.current.disabled = true
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/payment/process',
        paymentData,
        config
      )
      const client_secret = data.client_secret
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
          navigate('/success')
        } else {
          alert.error('There was some issue while processing payment.')
        }
      }
    } catch (error) {
      payBtn.current.disabled = false
      alert.error(error.response.data.message)
    }
  }

  return (
    <Fragment>
      <MetaData title='Payment' />
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
        </form>
      </div>
    </Fragment>
  )
}

export default Payment
