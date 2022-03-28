import React from 'react'
import { Container, Grid, Box, Link } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <Box className='Footer'>
        <Container maxWidth='sm'>
          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={4}>
              <Link href='/'>
                <InstagramIcon className='Icon' />
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Link href='/'>
                <FacebookIcon className='Icon' />
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              copyrights@PTS
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  )
}

export default Footer
