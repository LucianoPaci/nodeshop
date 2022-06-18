const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    itemPrice: {
      type: String,
      required: true,
    },
    itemsQuantity: {
      type: Number,
      required: true,
    },
    updatedAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'orders',
  }
)

module.exports = mongoose.model('order', orderSchema)
