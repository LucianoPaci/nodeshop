const Order = require('../models/order')
const { sendMessageToQueue } = require('../init/queue')
const constants = require('../utils/constants')

const create = async (data) => {
	try {
		sendMessageToQueue('orders_queue', data)
	} catch (error) {
		throw error
	}
	const order = await Order.create(data)

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
