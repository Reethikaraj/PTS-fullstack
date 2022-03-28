import express from 'express'
import {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} from '../controllers/productController.js'
import { isAuthenticatedUser, authoriseRoles } from '../middlewares/auth.js'

const router = express.Router()

router
  // Getting product details -Access to all (Must be logged in)
  .get('/products', getAllProducts)
  .get('/product/:id', getProductDetails)
  // Reviews
  .put('/product/review', isAuthenticatedUser, createProductReview)
  .get('/product/reviews', getProductReviews)
  .delete('/product/review/delete', isAuthenticatedUser, deleteReview)

  // Only Admin can access
  .put(
    '/admin/products/:id',
    isAuthenticatedUser,
    authoriseRoles('admin'),
    updateProduct
  )
  .delete(
    '/admin/products/:id',
    isAuthenticatedUser,
    authoriseRoles('admin'),
    deleteProduct
  )
router.post(
  '/admin/products/new',
  isAuthenticatedUser,
  authoriseRoles('admin'),
  createProduct
)

export default router
