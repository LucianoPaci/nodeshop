const Order = require('../models/order')
const { sendMessageToQueue } = require('../init/queue')
import constants from '../utils/constants'

const create = async (data) => {
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

const getById = async (id) => {
  const order = await Order.findById(id)
  return order
}

const getOrders = async (filter, limit = constants.DEFAULT_LIMIT) => {
  const orders = await Order.find(filter).limit(limit)

  return orders
}

module.exports = {
  create,
  getById,
  getOrders,
}
