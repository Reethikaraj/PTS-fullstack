import app from './index.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// ErrorHandling for Uncaught exceptions (like undefined eg.console.log(abc))
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`)
  console.log('Shutting down the server due to UNCAUGHT EXCEPTIONS')
  process.exit(1)
})

// .env config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config({ path: 'backend/.env' })
}

// Connecting mongoDB
const uri = process.env.MONGODB_URI
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // serverApi: ServerApiVersion.v1
  })
  .then(() => {
    console.log('Connection succesful')
    const server = app.listen(process.env.PORT, () =>
      console.log(`App running on port ${process.env.PORT}`)
    )
  })
  .catch(() => {
    console.log('connection failed')
  })

// ErrorHandling for Unhandled Promise Rejection(like No try or catch for a promise)
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`)
  console.log('Shutting down the server due to UNHANDLED PROMISE REJECTION')
  server.close(() => {
    process.exit(1)
  })
})
