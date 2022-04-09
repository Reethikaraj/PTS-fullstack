import React, { Fragment, useEffect } from 'react'
import { Container, Box, Grid, Typography } from '@mui/material'
import MetaData from '../MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProduct } from '../../redux/actions/productAction'
import Loader from '../loading/Loader'
import { useAlert } from 'react-alert'
import Carousel from 'react-material-ui-carousel'
import './Home.css'

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector(
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
                  <Box>
                    <Box className='Welcome'>
                      <Typography variant='p'>Welcome to PTS</Typography>
                      <Typography variant='h6'>
                        Find amazing Products below
                      </Typography>
                    </Box>
                    <a href='/products'>
                      <Carousel className='Carousel'>
                        {products &&
                          products.map((product) => (
                            <img
                              className='CarouselImage'
                              src={product.images[0].url}
                              alt='product'
                            />
                          ))}
                      </Carousel>
                    </a>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </React.Fragment>
      )}
    </Fragment>
  )
}

export default Home
