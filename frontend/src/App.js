import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import Loader from './components/loading/Loader'
import { useSelector } from 'react-redux'
import ProductDetails from './components/productDetails/ProductDetails'
import './App.css'
import Products from './components/products/Products'
import LoginRegister from './components/user/loginRegister/LoginRegister'
function App() {
  const themes = useSelector((state) => state.themeReducer.theme)
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
