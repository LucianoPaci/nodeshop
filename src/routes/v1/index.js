const express = require('express')
const ordersController = require('../../controllers/orders')

const router = express.Router()

router.get('/status', (req, res) => {
  res.status(200).send('OK')
})

router.post('/order', ordersController.createOrder)
router.get('/order/:id', ordersController.getOrderById)
router.get('/orders', ordersController.getOrders)

module.exports = router
