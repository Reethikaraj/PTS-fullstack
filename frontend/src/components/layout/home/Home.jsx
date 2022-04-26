import React, { Fragment, useEffect } from 'react'
import { Container, Box, Grid, Typography } from '@mui/material'
import MetaData from '../../MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProduct } from '../../../redux/actions/productAction'
import Loader from '../loading/Loader'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import './Home.css'
const Home = () => {
  const alert = useAlert()
  const navigate = useNavigate()
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
          <MetaData title='PTS - Pradha Trinkets store' />
          {/* Banner */}
          <Box
            className='Banner'
            sx={{
              position: 'relative',
              top: '10.5vh',
              height: '100vh',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Container
              maxWidth='lg'
              sx={{
                paddingLeft: '0',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Grid
                container
                spacing={1}
                sx={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <Grid item xs={12} sm={6} lg={6} md={6}>
                  <img
                    className='Logo'
                    src='assets/ptsLogoRBG.png'
                    alt='Logo'
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={6} md={6}>
                  <Box
                    sx={{
                      overflow: 'hidden',
                      textAlign: 'center',
                      justifyContent: 'center',
                      // paddingTop: '10%',
                    }}
                  >
                    <Typography variant='p'>Welcome to PTS</Typography>
                    <Typography variant='h6'>
                      Find amazing Products below
                    </Typography>
                    <Box sx={{ marginLeft: '23%' }}>
                      <Carousel className='CarouselHome' IndicatorIcon={''}>
                        {products &&
                          products.map((product) => (
                            <img
                              onClick={() => navigate('/products')}
                              className='CarouselImageHome'
                              src={product.images[0].url}
                              alt='product'
                            />
                          ))}
                      </Carousel>
                    </Box>
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
