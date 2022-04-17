import catchAsyncErrors from '../middlewares/catchAsyncError.js'
import Stripe from 'stripe'

const stripe = Stripe(
  'sk_test_51Kj5gUDhjEXclGcM0ZgEDErJewtuVnk3jtWZyTw4SvSI0jgd6Pb1mJa9MhEa3EIRdoCtwIQJddEG60cRTNbdpIfn00g67j9vzl'
)
export const processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    payment_method_types: ['card'],
    amount: req.body.amount,
    currency: 'sek',
    metadata: {
      company: 'PTS',
    },
  })
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret })
})

export const sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Key',
    stripeApiKey: process.env.STRIPE_API_KEY,
  })
})
