import { Types } from 'mongoose'
import { model as OrderModel, OrderFields, Order } from '../models/order'
import { sendMessageToQueue } from '../init/queue'
import constants from '../utils/constants'

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
  limit: number | string = constants.DEFAULT_LIMIT
) => {
  const parsedLimit = typeof limit === 'string' ? parseInt(limit) : limit
  const orders = await OrderModel.find(filter).limit(parsedLimit)

  return orders
}

export { create, getById, getOrders }
