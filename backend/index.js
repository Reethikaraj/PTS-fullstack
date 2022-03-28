import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import errorMiddleware from './src/middlewares/error.js'
import productRouter from './src/routers/productRouter.js'
import userRouter from './src/routers/userRouter.js'
import orderRouter from './src/routers/orderRouter.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

// .env config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config({ path: '.env' })
}
app.use(cookieParser())

app.use('/api/v1', productRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', orderRouter)

app.use(errorMiddleware)

export default app
