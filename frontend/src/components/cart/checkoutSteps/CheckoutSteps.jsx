import React, { Fragment } from 'react'
import { Typography, Stepper, StepLabel, Step } from '@material-ui/core'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import './CheckoutSteps.css'

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography className='checkSteps'>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography className='checkSteps'>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography className='checkSteps'>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ]
  const stepStyles = {
    boxSizing: 'border-box',
  }
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color:
                  activeStep >= index
                    ? 'var(--background-primary)'
                    : 'rgba(0, 0, 0, 0.649)',
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  )
}

export default CheckoutSteps
