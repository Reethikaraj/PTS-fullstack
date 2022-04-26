import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { saveShippingInfo } from '../../../redux/actions/cartAction'
import MetaData from '../../MetaData'
import { Container } from '@mui/material'
import PinDropIcon from '@mui/icons-material/PinDrop'
import HomeIcon from '@mui/icons-material/Home'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import PublicIcon from '@mui/icons-material/Public'
import PhoneIcon from '@mui/icons-material/Phone'
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation'
import { Country, State } from 'country-state-city'
import { useAlert } from 'react-alert'
import CheckoutSteps from '../checkoutSteps/CheckoutSteps'
import './Shipping.css'
import { useNavigate } from 'react-router-dom'

const Shipping = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const { shippingInfo } = useSelector((state) => state.cartReducer)
  const [address, setAddress] = useState(shippingInfo.address)
  const [city, setCity] = useState(shippingInfo.city)
  const [state, setState] = useState(shippingInfo.state)
  const [country, setCountry] = useState(shippingInfo.country)
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
  const shippingSubmit = (e) => {
    e.preventDefault()
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error('Please enter a valid phone number')
      return
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    )
    navigate('/order/confirm')
  }
  return (
    <Fragment>
      <MetaData title='PTS- Shipping Details' />
      <Container
        sx={{ position: 'relative', top: '11vh', paddingBottom: '10vh' }}
      >
        <CheckoutSteps activeStep={0} />
        <div className='shippingContainer'>
          <div className='shippingBox'>
            <h2 className='shippingHeading'>Shipping Details</h2>
            <form
              className='shippingForm'
              encType='multipart/form-data'
              onSubmit={shippingSubmit}
            >
              <div>
                <HomeIcon />
                <input
                  type='text'
                  placeholder='Address'
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <LocationCityIcon />
                <input
                  type='text'
                  placeholder='City'
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <PinDropIcon />
                <input
                  type='number'
                  placeholder='Pin Code'
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>

              <div>
                <PhoneIcon />
                <input
                  type='number'
                  placeholder='Phone Number'
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  size='10'
                />
              </div>

              <div>
                <PublicIcon />

                <select
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value=''>Country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name} {item.isoCode}
                      </option>
                    ))}
                </select>
              </div>

              {country && (
                <div>
                  <TransferWithinAStationIcon />
                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value=''>State</option>
                    {State &&
                      State.getStatesOfCountry('SE').map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <input
                type='submit'
                value='Continue'
                className='shippingBtn'
                disabled={state ? false : true}
              />
              <button className='shippingBtn' onClick={() => navigate('/cart')}>
                Back to Cart
              </button>
            </form>
          </div>
        </div>
      </Container>
    </Fragment>
  )
}

export default Shipping
