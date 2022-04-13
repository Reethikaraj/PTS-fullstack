import React from 'react'
import ProductCard from '../productCard/ProductCard'
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import './WishList.css'
const WishList = () => {
  const { wishList } = useSelector((state) => state.wishListReducer)
  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      sx={{
        height: '140vh',
        marginLeft: '0.5%',
        position: 'relative',
        top: '11vh',
      }}
    >
      <h1>WishList</h1>
      <h1>WishList</h1>
      {wishList
        ? wishList.map((product) => (
            <Grid container lg={1.5} md={3} sm={4} xs={5.5}>
              <h1>{product.name}</h1>
              <ProductCard product={product} />
            </Grid>
          ))
        : 'WishList is empty'}
    </Grid>
  )
}

export default WishList
