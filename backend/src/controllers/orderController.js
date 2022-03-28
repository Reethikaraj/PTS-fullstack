import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import ErrorHandler from '../utils/errorHandler.js'
import catchAsyncErrors from '../middlewares/catchAsyncError.js'

// Create New Order
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  })
  res.status(201).json({
    success: true,
    order,
  })
})

// Get logged in user Orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })
  res.status(200).json({
    success: true,
    orders,
  })
})

// Get Single Order -- Admin access only
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404))
  }
  res.status(200).json({
    success: true,
    order,
  })
})

// Get all Orders -- Admin access only
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find()
  let totalAmount = 0
  orders.forEach((order) => {
    totalAmount += order.totalPrice
  })
  res.status(200).json({
    success: true,
    totalAmount: totalAmount,
    numOfOrders: orders.length,
    orders,
  })
})

// Update Order Status -- Admin access only
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404))
  }
  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order', 400))
  }
  if (req.body.status === 'Shipped') {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity)
    })
  }
  order.orderStatus = req.body.status
  if (req.body.status === 'Delivered') {
    order.deliveredAt = Date.now()
  }
  await order.save({ validateBeforeSave: false })
  res.status(200).json({
    success: true,
    message: `Status of the order changed to ${req.body.status}`,
  })
})
async function updateStock(id, quant) {
  const product = await Product.findById(id)
  product.quantity -= quant
  await product.save({ validateBeforeSave: false })
}

// Delete Order -- Admin access only
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404))
  }
  await order.remove()
  res.status(200).json({
    success: true,
    message: `Order with id ${order._id} deleted successfully`,
  })
})
