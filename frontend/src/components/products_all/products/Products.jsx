import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {
  clearErrors,
  getProduct,
  sortByPrice,
  sortByRating,
} from '../../../redux/actions/productAction'
import Loader from '../../layout/loading/Loader'
import ProductCard from '../productCard/ProductCard'
import { Grid, Button, Box } from '@mui/material'
import Search from '../../search/Search'
import { useParams } from 'react-router-dom'
import MetaData from '../../MetaData'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import './Products.css'

// Category
const categories = ['Hair accessories', 'Kids accessories']
const Products = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const params = useParams()
  const { loading, error, products, price, rating } = useSelector(
    (state) => state.productReducer
  )
  // Category
  const [category, setCategory] = useState('')
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  // Fetching data from redux
  useEffect(() => {
    // Checking if there are any errors
    // Error display using react-alert
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct(category))
  }, [dispatch, error, alert, params.keyword, category])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Grid
          container
          justifyContent='center'
          spacing={1}
          sx={{
            height: '120%',
            position: 'relative',
            top: '10.5vh',
            padding: '1vh 1.8vh 8vh 1.5vh',
          }}
        >
          <MetaData title='PTS - Pradha Trinkets store' />
          <Grid lg={12} md={12} sm={12} xs={12} sx={{ justifyItems: 'center' }}>
            <Search placeholder='Search' data={products} />
            <Box
              sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              {/* <Button
                className='button'
                size='small'
                variant='contained'
                sx={{ margin: '5px' }}
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Category
              </Button> */}
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {/* <MenuItem
                  onClick={() => [
                    setCategory('Hair accessories'),
                    handleClose(),
                  ]}
                >
                  Hair accessories
                  </MenuItem> */}
                {categories.map((category) => (
                  <MenuItem
                    // className='category-link'
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Menu>
              <Button
                className='button'
                size='small'
                variant='contained'
                sx={{ margin: '5px' }}
                onClick={() => dispatch(sortByPrice(price))}
              >
                Price
                <ArrowDownwardIcon />
                <ArrowUpwardIcon />
              </Button>
              <Button
                className='button'
                size='small'
                variant='contained'
                sx={{ margin: '5px' }}
                onClick={() => dispatch(sortByRating(rating))}
              >
                Rating
                <ArrowDownwardIcon />
                <ArrowUpwardIcon />
              </Button>
            </Box>
          </Grid>
          {products &&
            products.map((product) => (
              <Grid
                container
                lg={2}
                md={3}
                sm={4}
                xs={6}
                sx={{ maxWidth: '48vw' }}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
      )}
    </Fragment>
  )
}

export default Products
