// Create Token and saving in cookie
import jwt from 'jsonwebtoken'
const sendToken = (user, statusCode, res) => {
  //   const token = user.getJWTToken()
  //   // options for cookie
  //   const options = {
  //     expires: new Date(
  //       // convert days to milli seconds
  //       Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //     ),
  //     httpOnly: true,
  //   }
  //  res.status(statusCode).cookie('token', token, options).json({
  //     success: true,
  //     user,
  //     token,
  //  } )

  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }
  res.status(statusCode).json({
    success: true,
    user,
    token: generateToken(user._id),
  })
}

export default sendToken
