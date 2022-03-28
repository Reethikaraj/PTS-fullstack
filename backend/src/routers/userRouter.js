import express from 'express'
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserRole,
} from '../controllers/userController.js'
import { isAuthenticatedUser, authoriseRoles } from '../middlewares/auth.js'

const router = express.Router()

// Register, Login, Logout
router
  .post('/user/register', registerUser)
  .post('/user/login', loginUser)
  .get('/user/logout', logoutUser)

// User has to be logged in - isAuthenticatedUser
router
  .get('/user/me', isAuthenticatedUser, getUserDetails)
  .put('/user/me/update', isAuthenticatedUser, updateProfile)
  .put('/user/update/password', isAuthenticatedUser, updatePassword)

// Forgot, Reset Password
router
  .post('/user/forgot/password', forgotPassword)
  .put('/user/reset/password/:token', resetPassword)

// Get user details, Update user role, Delete user - Admin access only
router
  .get(
    '/admin/users',
    isAuthenticatedUser,
    authoriseRoles('admin'),
    getAllUsers
  )
  .get(
    '/admin/user/:id',
    isAuthenticatedUser,
    authoriseRoles('admin'),
    getSingleUser
  )
  .put(
    '/admin/update/role/:id',
    isAuthenticatedUser,
    authoriseRoles('admin'),
    updateUserRole
  )
  .delete(
    '/admin/delete/user/:id',
    isAuthenticatedUser,
    authoriseRoles('admin'),
    deleteUser
  )

export default router
