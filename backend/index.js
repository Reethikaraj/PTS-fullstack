import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import errorMiddleware from './src/middlewares/error.js'
import productRouter from './src/routers/productRouter.js'
import userRouter from './src/routers/userRouter.js'
import orderRouter from './src/routers/orderRouter.js'
import paymentRouter from './src/routers/paymentRouter.js'
import cors from 'cors'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

// // .env config
// if (process.env.NODE_ENV !== 'PRODUCTION') {
//   dotenv.config({ path: '.env' })
// }

// For joining frontend and backend
// app.use(express.static(path.join(__dirname, '../frontend/build')))
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
// })
app.use(cookieParser())
// For cloudinary
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

app.use('/api/v1', productRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', orderRouter)
app.use('/api/v1', paymentRouter)

app.use(errorMiddleware)

export default app
