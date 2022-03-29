import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import Loader from './components/loading/Loader'
import { useSelector } from 'react-redux'
import ProductDetails from './components/productDetails/ProductDetails'
import Products from './components/products/Products'
import LoginRegister from './components/user/loginRegister/LoginRegister'
import reduxStore from './redux/store/store'
import { loadUser } from './redux/actions/userAction'
import Profile from './components/user/profile/Profile'
import ProtectedRoute from './components/route/ProtectedRoute'
import './App.css'
function App() {
  React.useEffect(() => {
    // Dispatching loadUser so that the state is shown when the user logins
    reduxStore.dispatch(loadUser())
  }, [])
  const themes = useSelector((state) => state.themeReducer.theme)
  return (
    <div className='App' data-theme={themes}>
      <BrowserRouter>
        <Header />
        {/* {isAuthenticated && <UserOptions user={user} />} */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sad' element={<Loader />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route path='/login' element={<LoginRegister />} />
          <Route
            path='/account'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}
export default App
