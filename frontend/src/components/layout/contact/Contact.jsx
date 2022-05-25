import React from 'react'
import { Container, Box, Grid, Typography } from '@mui/material'
import MetaData from '../../MetaData'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import CallIcon from '@mui/icons-material/Call'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import '../home/Home.css'

const Contact = () => {
  return (
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
              <img className='Logo' src='assets/ptsLogoRBG.png' alt='Logo' />
            </Grid>
            <Grid item xs={12} sm={6} lg={6} md={6}>
              <Box
                sx={{
                  overflow: 'hidden',
                  padding: '10%',
                }}
              >
                <a href='tel:+46761529434'>
                  <Box
                    sx={{
                      display: 'flex',
                      margin: '10px 0',
                      flexDirection: 'row',
                    }}
                  >
                    <CallIcon sx={{ flexGrow: 0.03, marginTop: '4px' }} />
                    <Typography variant='body1'>Call us</Typography>
                  </Box>
                </a>
                <a
                  href='mailto:reetusmiley@gmail.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Box
                    sx={{
                      display: 'flex',
                      margin: '10px 0',
                      flexDirection: 'row',
                    }}
                  >
                    <ContactMailIcon
                      sx={{
                        flexGrow: 0.03,
                        margin: '2px 4px 0 4px',
                      }}
                    />
                    <Typography variant='body1'>
                      Email Us @ reetusmiley@gmail.com
                    </Typography>
                  </Box>
                </a>
                <a
                  href='https://www.facebook.com/Pradha_trinkets_store-108123645156040'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Box
                    sx={{
                      display: 'flex',
                      margin: '10px 0',
                      flexDirection: 'row',
                    }}
                  >
                    <FacebookIcon sx={{ flexGrow: 0.03, marginTop: '2px' }} />
                    <Typography variant='body1'>Follow us</Typography>
                  </Box>
                </a>
                <a
                  href='https://www.instagram.com/pradha_trinkets_store/?igshid=YmMyMTA2M2Y='
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Box
                    sx={{
                      display: 'flex',
                      margin: '10px 0',
                      flexDirection: 'row',
                    }}
                  >
                    <InstagramIcon sx={{ flexGrow: 0.03, marginTop: '2px' }} />
                    <Typography variant='body1'>Follow us</Typography>
                  </Box>
                </a>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  )
}

export default Contact
