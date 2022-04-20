import app from './index.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cloudinary from 'cloudinary'

// ErrorHandling for Uncaught exceptions (like undefined eg.console.log(abc))
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`)
  console.log('Shutting down the server due to UNCAUGHT EXCEPTIONS')
  process.exit(1)
})

// env config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config({ path: '.env' })
}
// dotenv.config()

// Connecting mongoDB
const uri = process.env.MONGODB_URI
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // serverApi: ServerApiVersion.v1,
  })
  .then(() => {
    console.log('Connection succesful')
    const server = app.listen(process.env.PORT || 5000, () =>
      console.log(`App running on port ${process.env.PORT}`)
    )
  })
  .catch(() => {
    console.log('Connection failed')
  })

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// ErrorHandling for Unhandled Promise Rejection(like No try or catch for a promise)
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`)
  console.log('Shutting down the server due to UNHANDLED PROMISE REJECTION')
  server.close(() => {
    process.exit(1)
  })
})
