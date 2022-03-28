import React, { Fragment, useEffect } from 'react'
import { Container, Box, Grid, Typography } from '@mui/material'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import Product from '../productCard/ProductCard'
import MetaData from '../MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProduct } from '../../redux/actions/productAction'
import Loader from '../loading/Loader'
import { useAlert } from 'react-alert'
import './Home.css'

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { loading, error, products, productCount } = useSelector(
    (state) => state.productReducer
  )
  // Fetching data from redux
  useEffect(() => {
    // Checking if there are any errors
    // Error display using react-alert
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct())
  }, [dispatch, error, alert])

  return (
    <Fragment>
      {/* Condition for loading */}
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <MetaData title='PTS' />
          {/* Banner */}
          <Box className='Banner'>
            <Container maxWidth='lg'>
              <Grid container spacing={1.5}>
                <Grid item xs={12} sm={6}>
                  <img className='img' src='assets/ptsLogoRBG.png' alt='Logo' />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box className='Welcome'>
                    <Typography variant='p'>Welcome to PTS</Typography>
                    <Typography variant='h6'>
                      Find amazing Products below
                    </Typography>
                    <a href='#products'>
                      <ArrowDropDownCircleIcon />
                    </a>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Featured Products */}

          <h2 className='homeHeading'>Featured Products</h2>
          {/* Products */}
          <Grid container spacing={1}>
            {products &&
              products.map((product) => (
                <Grid lg={3} xs={12}>
                  <Product product={product} />
                </Grid>
              ))}
          </Grid>
        </React.Fragment>
      )}
    </Fragment>
  )
}

export default Home
