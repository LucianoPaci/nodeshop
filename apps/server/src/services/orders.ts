import { Types } from 'mongoose'
import { OrderFields, Order } from '@lucianopaci/nodeshop-types'
import { model as OrderModel } from '../models/order'
import { sendMessageToQueue } from '../init/queue'
import { OrderStatus } from 'aws-sdk/clients/outposts'
// import constants from '../utils/constants'

const create = async (data: OrderFields) => {
  const order: Order = await OrderModel.create(data)
  if (order) {
    sendMessageToQueue('orders_queue', data, order)
  }

  return order
}

const getById = async (id: string | Types.ObjectId) => {
  const order = await OrderModel.findById(id)
  return order
}

const getOrders = async (
  filter: any,
  limit: number | string,
  sort?: string
) => {
  const parsedLimit = typeof limit === 'string' ? parseInt(limit) : limit
  const parsedSort = sort === 'desc' ? -1 : 1
  const orders = await OrderModel.find(filter)
    .sort({ _id: parsedSort })
    .limit(parsedLimit)

  return orders
}

const updateOrder = async (
  id: string | Types.ObjectId,
  status: OrderStatus
  // order: OrderFields & { status: string }
) => {
  try {
    const update = await OrderModel.updateOne({ _id: id }, { status })
    if (update.matchedCount > 0) {
      return getById(id)
    }
  } catch (error) {
    throw error
  }
}

export { create, getById, getOrders, updateOrder }
