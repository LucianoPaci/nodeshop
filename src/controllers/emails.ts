import { Request, Response } from 'express'
import { ordersService, emailsService } from '../services'

export interface IEmailsFilter {
  from?: string
  to?: string
}

const getEmails = async (req: Request, res: Response) => {
  const { from, to } = req.query
  const limit = req.query.limit as string

  const filter: IEmailsFilter = {}

  if (from) filter.from = from as string
  if (to) filter.to = to as string

  const emails = await emailsService.findEmails(filter, limit)
  res.send(emails)
}

const createEmail = async (req: Request, res: Response) => {
  // Validate body and if the order._id is valid
  const { orderId } = req.params
  const { body } = req

  if (!orderId) {
    throw new Error('An OrderId is required')
  }

  const order = await ordersService.getById(orderId)

  if (!order) {
    res.send(404)
    return
  }

  const email = await emailsService.createEmail({ ...body, orderId: order._id })

  res.send(email)
}

export {
  getEmails,
  createEmail,
}
