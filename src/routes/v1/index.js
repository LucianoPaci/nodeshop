const express = require('express')
const ordersController = require('../../controllers/orders')
const emailsController = require('../../controllers/emails')

const router = express.Router()

router.get('/status', (req, res) => {
  res.status(200).send('OK')
})

/**
 * Orders
 */
router.post('/order', ordersController.createOrder)
router.get('/order/:id', ordersController.getOrderById)
router.get('/orders', ordersController.getOrders)

/**
 * Emails
 */
router.post('/email/:orderId', emailsController.createEmail)
router.get('/emails', emailsController.getEmails)

module.exports = router
