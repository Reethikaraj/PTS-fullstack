import ErrorHandler from '../utils/errorHandler.js'

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Internal Server Error'

  // Wrong Mongodb Id error or Cast Object id error (eg. If you give a wrong id of shorter length)
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`
    err = new ErrorHandler(message, 400)
  }

  // Mongoose duplicate key error(eg. Registered user trying to register again)
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
    err = new ErrorHandler(message, 400)
  }

  // Wrong JWT error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Json Web Token is invalid, Try again '
    err = new ErrorHandler(message, 400)
  }

  // JWT EXPIRE error
  if (err.name === 'TokenExpiredError') {
    const message = 'Json Web Token is Expired, Try again '
    err = new ErrorHandler(message, 400)
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err.stack,
  })
}
