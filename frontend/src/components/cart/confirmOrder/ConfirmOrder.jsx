import React, { Fragment } from 'react'
import CheckoutSteps from '../checkoutSteps/CheckoutSteps'
import { useSelector } from 'react-redux'
import MetaData from '../../MetaData'
import { Link, useNavigate } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import './ConfirmOrder.css'
const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cartReducer)
  const { user } = useSelector((state) => state.userReducer)
  const navigate = useNavigate()
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  )
  const shippingCharges = subtotal > 400 ? 0 : 30
  const tax = subtotal * 0.18
  const totalPrice = subtotal + tax + shippingCharges
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`
  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    }
    sessionStorage.setItem('orderInfo', JSON.stringify(data))
    navigate('/process/payment')
  }
  return (
    <Fragment>
      <MetaData title='Confirm Order' />
      <CheckoutSteps activeStep={1} />
      <div className='confirmOrderPage'>
        <div>
          <div className='confirmshippingArea'>
            <Typography>Shipping Info</Typography>
            <div className='confirmshippingAreaBox'>
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className='confirmCartItems'>
            <Typography>Your Cart Items:</Typography>
            <div className='confirmCartItemsContainer'>
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt='Product' />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X {item.price} SEK ={' '}
                      <b>
                        {item.price} SEK*{item.quantity}
                      </b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className='orderSummary'>
            <Typography>Order Summary</Typography>
            <span>Free shipping for orders above 400 sek</span>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>{subtotal} SEK</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>{shippingCharges} SEK</span>
              </div>
              <div>
                <p>Tax:</p>
                <span>{tax} SEK</span>
              </div>
            </div>
            <div className='orderSummaryTotal'>
              <p>
                <b>Total:</b>
              </p>
              <span>{totalPrice} SEK</span>
            </div>
            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ConfirmOrder
