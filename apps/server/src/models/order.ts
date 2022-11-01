import { OrderStatus } from '@lucianopaci/nodeshop-types'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
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
    status: {
      type: String,
      enum: OrderStatus,
      default: 'pending',
    },
    updatedAt: {
      type: Date,
      default: Date.now,
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

export const model = mongoose.model('order', schema)
