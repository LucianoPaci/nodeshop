const { ordersService, emailsService } = require('../services')

const getEmails = async (req, res) => {
  const { from, to, limit } = req.query
  const filter = {}

  if (from) filter.from = from
  if (to) filter.to = to

  const emails = await emailsService.findEmails(filter, limit)
  res.send(emails)
}

const createEmail = async (req, res) => {
  // Validate body and if the order._id is valid
  const { orderId } = req.params
  const { body } = req

  if (!orderId) {
    throw new Error('An OrderId is required')
  }

  const order = await ordersService.getById(orderId)

  if (!order) {
    res.send(404)
  }

  const email = await emailsService.createEmail({ ...body, orderId: order._id })
  await emailsService.sendEmail(body)

  res.send(email)
}

module.exports = {
  getEmails,
  createEmail,
}
