import express, { Request, Response } from 'express'
import ordersController from '../../controllers/orders'
import emailsController from '../../controllers/emails'

const router = express.Router()

router.get('/status', (req: Request, res: Response) => {
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

export default router
