import ErrorHandler from '../utils/errorHandler.js'
import catchAsyncErrors from '../middlewares/catchAsyncError.js'
import User from '../models/userModel.js'
import sendToken from '../utils/jwtToken.js'
import sendEmail from '../utils/sendEmail.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import cloudinary from 'cloudinary'

// Register user
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  // Cloudinary for avatar
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatar',
    width: 150,
    crop: 'scale',
  })
  const { name, email, password } = req.body
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  })
  sendToken(user, 201, res)
})

// Login User
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body
  // Checking if both email, password are entered
  if (!email || !password) {
    return next(new ErrorHandler('PLease enter Email & Password', 400))
  }
  // +password because in the userModel 'select': false and we need it now
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401))
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password)
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password', 401))
  }
  sendToken(user, 200, res)
})

// Logout User
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })
  res.status(200).json({
    success: true,
    message: 'Logged out',
  })
})

// Forgot Password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  // searching for the user
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(new ErrorHandler('User not found', 404))
  }
  // Getting ResetPassword token
  const resetToken = user.getResetPasswordToken()
  await user.save({ validateBeforeSave: false })
  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`
  // Sending Email with url that ha sthe token to user
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this, please ignore.`
  try {
    await sendEmail({
      email: user.email,
      subject: 'PTS Password Recovery',
      message,
    })
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save({ validateBeforeSave: false })
    return next(new ErrorHandler(error.message, 500))
  }
})

// Reset Password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })
  if (!user) {
    return next(
      new ErrorHandler(
        'Reset Password Token is invalid or has been expired',
        400
      )
    )
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400))
  }
  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()
  sendToken(user, 200, res)
})

// Get User(whoever is logged in) Detail (User has to be logged in - isAuthenticatedUser)
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  res.status(200).json({
    success: true,
    user,
  })
})

// Update User Password (User has to be logged in - isAuthenticatedUser)
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')
  const isPasswordMatched = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  )
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password', 401))
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler('password does not match', 400))
  }
  user.password = req.body.newPassword
  await user.save()
  sendToken(user, 200, res)
})

// Update User Profile (User has to be logged in - isAuthenticatedUser)
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  }
  // if (req.body.avatar !== '') {
  //   const user = await User.findById(req.user.id)
  //   const imageId = user.avatar.public_id
  //   await cloudinary.v2.uploader.destroy(imageId)
  //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //     folder: 'avatars',
  //     width: 150,
  //     crop: 'scale',
  //   })
  //   newUserData.avatar = {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   }
  // }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({
    success: true,
  })
})

// Get all users details - Admin access only
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find()
  res.status(200).json({
    success: true,
    numOfUsers: users.length,
    users,
  })
})

// Get single user - Admin access only
export const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    )
  }
  res.status(200).json({
    success: true,
    user,
  })
})

// Update User Role -- Admin access only
export const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }
  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({
    success: true,
    message: `${req.body.name} is updated as ${req.body.role}`,
  })
})

// Delete User - Admin access only
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    )
  }
  // const imageId = user.avatar.public_id
  // await cloudinary.v2.uploader.destroy(imageId)
  await user.remove()
  res.status(200).json({
    success: true,
    message: ` ${user.name} Deleted Successfully`,
  })
})
