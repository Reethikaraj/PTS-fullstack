import express from 'express'
import { isAuthenticatedUser, authoriseRoles } from '../middlewares/auth.js'
import {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from '../controllers/orderController.js'

const router = express.Router()

router
  .post('/order/new', isAuthenticatedUser, newOrder)
  .get('/order/me', isAuthenticatedUser, myOrders)
  // Admin access only
  .get(
    '/order/:id',
    isAuthenticatedUser,
    authoriseRoles('admin'),
    getSingleOrder
  )
  .get(
    '/admin/orders',
    isAuthenticatedUser,
    authoriseRoles('admin'),
    getAllOrders
  )
  .put(
    '/admin/order/updatestatus/:id',
    isAuthenticatedUser,
    authoriseRoles('admin'),
    updateOrder
  )
  .delete(
    '/admin/order/delete/:id',
    isAuthenticatedUser,
    authoriseRoles('admin'),
    deleteOrder
  )

export default router
