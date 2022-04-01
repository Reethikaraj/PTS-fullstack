import express from 'express'
import {
  processPayment,
  sendStripeApiKey,
} from '../controllers/paymentController.js'
import { isAuthenticatedUser } from '../middlewares/auth.js'

const router = express.Router()
router.post('/payment/process', isAuthenticatedUser, processPayment)
router.get('/stripeapikey', sendStripeApiKey)

export default router
