import React, { Fragment } from 'react'
import CartItemCard from '../cartItem/CartItem'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { Button, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import {
  addItemsToCart,
  removeItemsFromCart,
} from '../../../redux/actions/cartAction'
import './Cart.css'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id))
  }
  const checkoutHandler = () => {
    navigate('/shipping')
    // navigate('/login?redirect=shipping')
  }
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className='emptyCart'>
          <RemoveShoppingCartIcon />
          <Typography>No Products in Your Cart</Typography>
          <Link to='/products'>View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className='cartPage'>
            <div className='cartHeader'>
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className='cartContainer'>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className='cartInput'>
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type='number' value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.stock,
                          item.quantity
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className='cartSubtotal'>{`${
                    item.price * item.quantity
                  }SEK`}</p>
                </div>
              ))}
            <div className='cartGrossTotal'>
              <div></div>
              <div className='cartGrossTotalBox'>
                <p>Gross Total</p>
                <p>{`${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}SEK`}</p>
              </div>
              <div></div>
              <div className='checkOutBtn'>
                <Button onClick={checkoutHandler}>Check Out</Button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Cart
