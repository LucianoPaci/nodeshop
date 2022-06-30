import  {Types} from 'mongoose'
import { model as Order, OrderFields } from '../models/order'
import { sendMessageToQueue } from '../init/queue'
import constants from '../utils/constants'

const create = async (data: OrderFields) => {
  let order
  try {
    order = await Order.create(data)
    if (order) {
      sendMessageToQueue('orders_queue', data, order)
    }
  } catch (error) {
    throw error
  }

  return order
}

const getById = async (id: string | Types.ObjectId) => {
  const order = await Order.findById(id)
  return order
}

const getOrders = async (filter: any, limit: number | string = constants.DEFAULT_LIMIT) => {
  const parsedLimit = typeof limit === 'string' ? parseInt(limit) : limit
  const orders = await Order.find(filter).limit(parsedLimit)

  return orders
}

export {
  create,
  getById,
  getOrders,
}
