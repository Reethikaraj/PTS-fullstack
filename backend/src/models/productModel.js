import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add the name'],
      index: true,
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Please add the category'],
    },
    price: {
      type: Number,
      required: [true, 'Please add the price'],
      default: 50,
    },
    description: {
      skus: { type: [String] },
      color: {
        type: String,
        required: [true, 'Please add color of the product'],
      },
      material: {
        type: String,
        required: [true, 'Please add material of the product'],
      },
      numOfPieces: {
        type: Number,
        required: [true, 'Please add number of items'],
      },
      about: { type: String, required: [true, 'Please add about the product'] },
      features: {
        type: [String],
        required: [true, 'Please add features of the product'],
      },
    },
    images: [
      {
        publicId: {
          type: String,
          required: [true, 'Please add public id'],
          unique: true,
        },
        url: {
          type: String,
          required: [true, 'Please add url of the image'],
          unique: true,
        },
      },
    ],
    quantity: {
      type: Number,
      required: [true, 'Please add the quantity'],
      default: 1,
    },
    isAvailable: {
      type: Boolean,
      required: [true, 'Please add the availability'],
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timeStamps: true }
)

export default mongoose.model('Product', productsSchema)
