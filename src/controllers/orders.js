const { ordersService } = require('../services')

const createOrder = async (req, res) => {
  const { body } = req

  const order = await ordersService.create(body)

  res.send(order)
}

const getOrderById = async (req, res) => {
  const { id } = req.params

  const order = await ordersService.getById(id)

  res.send(order)
}

const getOrders = async (req, res) => {
  const { limit, userEmail, itemName } = req.query

  const filter = {}

  if (userEmail) filter.userEmail = userEmail
  if (itemName) filter.itemName = itemName

  const orders = await ordersService.getOrders(filter, limit)

  res.send(orders)
}

module.exports = {
  createOrder,
  getOrderById,
  getOrders,
}
