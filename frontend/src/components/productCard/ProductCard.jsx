import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import './ProductCard.css'
import { Box, Container, Typography } from '@mui/material'

const Product = ({ product }) => {
  // Rating stars settings
  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    value: product.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  }
  return (
    <Fragment>
      <Box>
        <Link className='productCard' to={`/product/${product._id}`}>
          <img src={product.images[0].url} alt='Product' />
          <Typography variant='subtitle2'>{product.name}</Typography>
          <div>
            <ReactStars {...options} />
            <Typography variant='caption'>
              ({product.numOfReviews} Reviews)
            </Typography>
          </div>
          <Typography variant='subtitle2'>{product.price} SEK</Typography>
        </Link>
      </Box>
    </Fragment>
  )
}

export default Product
