const express = require('express')
const ordersController = require('../../controllers/orders')

const router = express.Router()

router.get('/status', (req, res) => {
  res.status(200).send('OK')
})

router.post('/order', ordersController.createOrder)

module.exports = router
