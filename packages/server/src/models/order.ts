import mongoose, { Schema } from 'mongoose'
import { BaseDocument, OrderFields } from '@nodeshop/types'

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
export type Order = OrderFields & BaseDocument

export const model = mongoose.model('order', schema)
