import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, getProduct } from '../../redux/actions/productAction'
import Loader from '../loading/Loader'
import ProductCard from '../productCard/ProductCard'
import {
  Container,
  Grid,
  Pagination,
  Slider,
  Typography,
  Box,
  Rating,
} from '@mui/material'
import Search from '../search/Search'
import { useParams } from 'react-router-dom'
import './Products.css'

// Category
const categories = ['Hair accessories', 'Kids accessories']
const Products = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const params = useParams()
  const { loading, error, products, productCount, resultsPerPage } =
    useSelector((state) => state.productReducer)
  // For Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const setCurrentPageNo = (e, value) => {
    setCurrentPage(value)
  }
  const pageCount = Math.ceil(productCount / resultsPerPage)
  // Price Filtering
  const [price, setprice] = useState([0, 500])
  const priceHandler = (e, newPrice) => {
    setprice(newPrice)
  }
  // Category
  const [category, setCategory] = useState('')
  // Rating
  const [rating, setRating] = useState(0)
  // Fetching data from redux
  useEffect(() => {
    // Checking if there are any errors
    // Error display using react-alert
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct(params.keyword, currentPage, price, category, rating))
  }, [
    dispatch,
    error,
    alert,
    params.keyword,
    currentPage,
    price,
    category,
    rating,
  ])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container className='products'>
          <Grid
            container
            spacing={0.5}
            justifyContent='center'
            alignItems='center'
          >
            <Grid lg={12} md={12} sm={12} xs={12}>
              <h2 className='productsHeading'>Products</h2>
              <Search />
              <Box className='filterBox'>
                <Box className='innerBox'>
                  {/* Filtering by price */}
                  <Typography variant='body2'>Price</Typography>
                  <Slider
                    className='slider'
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay='auto'
                    aria-labelledby='range-slider'
                    min={0}
                    max={500}
                  />
                </Box>
                <Box className='innerBox'>
                  {/* Filtering by category */}
                  <Typography variant='body2'>Categories</Typography>
                  <ul className='categoryBox'>
                    {categories.map((category) => (
                      <li
                        className='category-link'
                        key={category}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </Box>
                <Box className='innerBox'>
                  {/* Filtering by rating */}
                  <Typography variant='body2' component='legend'>
                    Ratings Above
                  </Typography>
                  <Rating
                    className='slider'
                    name='simple-controlled'
                    onChange={(e, newRating) => {
                      setRating(newRating)
                    }}
                    value={rating}
                    min={0}
                    max={5}
                  />
                </Box>
              </Box>
            </Grid>

            {products &&
              products.map((product) => (
                <Grid lg={3} md={4} sm={4} sx={6}>
                  <ProductCard product={product} />
                </Grid>
              ))}

            {resultsPerPage < productCount && (
              <Pagination
                className='pagination'
                onChange={setCurrentPageNo}
                count={pageCount}
                page={currentPage}
              />
            )}
          </Grid>
        </Container>
      )}
    </Fragment>
  )
}

export default Products
