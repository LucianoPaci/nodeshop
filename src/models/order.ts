import mongoose, { Model, Schema, Types } from 'mongoose'
import { BaseDocument } from './base'

export interface OrderFields {
  userEmail: string
  itemName: string
  itemPrice: string
  itemsQuantity: number 
}

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

export const model = mongoose.model('order', schema) as Model<Order>
