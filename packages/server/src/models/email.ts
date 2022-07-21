import mongoose, { Model, Schema, Types } from 'mongoose'
import { BaseDocument } from './base'

export interface EmailFields {
  from: string
  to: string
  subject?: string
  html: string
}

export interface EmailWithOrder extends EmailFields {
  orderId: string | Types.ObjectId
}

const emailSchema = new Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
    },
    html: {
      type: String,
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'order',
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
    collection: 'emails',
  }
)

export type Email = EmailWithOrder & BaseDocument

export const model = mongoose.model('email', emailSchema) as Model<Email>
