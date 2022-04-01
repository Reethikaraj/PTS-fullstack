import ErrorHandler from '../utils/errorHandler.js'
import catchAsynErrors from './catchAsyncError.js'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const isAuthenticatedUser = catchAsynErrors(async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return next(new ErrorHandler('Please Login to access this Resource', 401))
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(decodedData.id)
  next()

  // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
  //   jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
  //     if (err) req.user = undefined;
  //     User.findOne({
  //         _id: decode.id
  //       })
  //       .exec((err, user) => {
  //         if (err) {
  //           res.status(500)
  //             .send({
  //               message: err
  //             });
  //         } else {
  //           req.user = user;
  //           next();
  //         }
  //       })
  //   });
  // } else {
  //   req.user = undefined;
  //   next();
  // }
})

export const authoriseRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      )
    }
    next()
  }
}
