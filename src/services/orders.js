const Order = require('../models/order')
const DEFAULT_LIMIT = 10

const create = async (data) => {
  const order = await Order.create(data)
  return order
}

const getById = async (id) => {
  const order = await Order.findById(id)
  return order
}

const getOrders = async (filter, limit = DEFAULT_LIMIT) => {
  const orders = await Order.find(filter).limit(limit)

  return orders
}

module.exports = {
  create,
  getById,
  getOrders,
}
