import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import Loader from './components/loading/Loader'
import { useSelector } from 'react-redux'
import ProductDetails from './components/productDetails/ProductDetails'
import Products from './components/products/Products'
import LoginRegister from './components/user/loginRegister/LoginRegister'
import Profile from './components/user/profile/Profile'
import UpdateProfile from './components/user/updateProfile/UpdateProfile'
import Cart from './components/cart/cart/Cart'
import Shipping from './components/cart/shipping/Shipping'
import ConfirmOrder from './components/cart/confirmOrder/ConfirmOrder'
import Payment from './components/cart/payment/Payment'
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import WishList from './components/wishList/WishList'

import './App.css'
import OrderSuccess from './components/cart/orderSuccess/OrderSuccess'
import MyOrders from './components/orders/myOrders/MyOrders'
import OrderDetails from './components/orders/orderDetails/OrderDetails'
function App() {
  const themes = useSelector((state) => state.themeReducer.theme)
  const [stripeApiKey, setStripeApiKey] = useState('')
  async function getStripeApiKey() {
    const { data } = await axios.get(
      'https://pradha-backend.herokuapp.com/api/v1/stripeapikey'
    )
    setStripeApiKey(data.stripeApiKey)
  }
  useEffect(() => {
    getStripeApiKey()
  })
  const stripePromise = loadStripe(stripeApiKey)
  return (
    <div className='App' data-theme={themes}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sad' element={<Loader />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route path='/login' element={<LoginRegister />} />
          <Route path='/account' element={<Profile />} />
          <Route path='/me/update' element={<UpdateProfile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<WishList />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/order/confirm' element={<ConfirmOrder />} />
          <Route
            path='/process/payment'
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
          <Route path='/success' element={<OrderSuccess />} />
          <Route path='/orders' element={<MyOrders />} />
          <Route path='/order/:id' element={<OrderDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}
export default App
