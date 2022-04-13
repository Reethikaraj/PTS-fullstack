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
import ProtectedRoute from './components/route/ProtectedRoute'
import UpdateProfile from './components/user/updateProfile/UpdateProfile'
import Cart from './components/cart/cart/Cart'
import Shipping from './components/cart/shipping/Shipping'
import ConfirmOrder from './components/cart/confirmOrder/ConfirmOrder'
import Payment from './components/cart/payment/Payment'
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { loadUser } from './redux/actions/userAction'
import storeFactory from './redux/store/store'
import WishList from './components/wishList/WishList'

import './App.css'
function App() {
  const store = storeFactory()
  const themes = useSelector((state) => state.themeReducer.theme)
  const [stripeApiKey, setStripeApiKey] = useState('')
  async function getStripeApiKey() {
    const { data } = await axios.get(
      'http://localhost:5000/api/v1/stripeapikey'
    )
    setStripeApiKey(data.stripeApiKey)
  }
  useEffect(() => {
    store.dispatch(loadUser())
    console.log('loader')
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
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path='/account' element={<Profile />} />
          <Route path='/me/update' element={<UpdateProfile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<WishList />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/order/confirm' element={<ConfirmOrder />} />
          {/* </Route> */}
          <Route element={<ProtectedRoute />}>
            <Route
              path='/process/payment'
              element={
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              }
            />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}
export default App
