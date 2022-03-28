// Create Token and saving in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken()

  // options for cookie
  const options = {
    expires: new Date(
      // convert days to milli seconds
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
  })
}

export default sendToken
