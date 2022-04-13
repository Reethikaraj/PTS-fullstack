/* eslint-disable new-cap */
import Product from '../models/productModel.js'
import ApiFeatures from '../utils/apiFeatures.js'
import catchAsyncErrors from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../utils/errorHandler.js'

// Get All Product
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const productCount = await Product.countDocuments()
  const resultsPerPage = 8
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
  // .pagination(resultsPerPage)
  let products = await apiFeature.query
  // let filteredProductCount = products.length
  // apiFeature.pagination(resultsPerPage)
  // products = await apiFeature.query
  res.status(200).json({
    success: true,
    products,
    productCount,
    // resultsPerPage,
    // filteredProductCount,
  })
})

// Get Single Product Details
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler('Product not found', 404))
  }
  res.status(200).json({
    success: true,
    product,
  })
})

// Create Product -- Admin access only
export const createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id
  const product = await Product.create(req.body)
  res.status(201).json({
    succes: true,
    product,
  })
})

// Update product --Admin access only
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler('Product not found', 500))
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({
    success: true,
    product,
  })
})

// Delete Product --Admin access only
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler('Product not found', 404))
  }
  await product.remove()
  res.status(200).json({
    success: true,
    message: 'Product Deleted Successfully',
  })
})

// Create New Review or Update the review
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  }
  const product = await Product.findById(productId)
  // // Checking if there is already a review by this user
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  )
  console.log(isReviewed)
  console.log(product)
  console.log(req.body)
  if (isReviewed) {
    // Updating the review
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment)
    })
  } else {
    // New review
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }
  let totalRating = 0
  product.reviews.forEach((rev) => {
    totalRating += rev.rating
  })

  // To get average, divide by reviews.length
  product.rating = totalRating / product.reviews.length
  await product.save({ validateBeforeSave: false })
  res.status(200).json({
    success: true,
    review: review,
  })
})

// Get All Reviews of a product
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id)
  if (!product) {
    return next(new ErrorHandler('Product not found', 404))
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  })
})

// Delete a Product Review
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id)
  if (!product) {
    return next(new ErrorHandler('Product not found', 404))
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  )
  let avg = 0
  reviews.forEach((rev) => {
    avg += rev.rating
  })
  let ratings = 0
  if (reviews.length === 0) {
    ratings = 0
  } else {
    ratings = avg / reviews.length
  }
  const numOfReviews = reviews.length
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )
  res.status(200).json({
    success: true,
    reviews: reviews,
  })
})
