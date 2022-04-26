import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter Your Name'],
      maxLength: [30, 'Name cannot exceed 30 characters'],
      minLength: [4, 'Name should have more than 4 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Please Enter Your Name'],
      maxLength: [30, 'Name cannot exceed 30 characters'],
      minLength: [4, 'Name should have more than 4 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please Enter Your Email'],
      unique: true,
      validate: [validator.isEmail, 'Please Enter a valid Email'],
    },
    password: {
      type: String,
      required: [true, 'Please Enter Your Password'],
      minLength: [8, 'Password should be greater than 8 characters'],
      // While fetching info, password will not be fetched
      select: false,
    },
    // avatar: {
    //   public_id: {
    //     type: String,
    //     required: true,
    //   },
    //   url: {
    //     type: String,
    //     required: true,
    //   },
    // },
    role: {
      type: String,
      default: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timeStamps: true }
)

// Hashing Passwords
userSchema.pre('save', async function (next) {
  // If password is not changed but the username, avatar are changed.
  if (!this.isModified('password')) {
    next()
  }
  // If password is changed
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  console.log(salt)
})

// Generating token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// Genereating password reset token
userSchema.methods.getResetPasswordToken = function () {
  // randomBytes(20) - creates 20 random bytes of buffer value
  // .toString - converts buffer value to some symbols
  // hex - used to convert buffer value to string
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  // sha256 is one of the algorithms used officially
  // digest to convert it back to the string

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
  // expires in 15 mins
  return resetToken
}

export default mongoose.model('User', userSchema)
