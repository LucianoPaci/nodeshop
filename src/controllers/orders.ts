import { Request, Response } from 'express'
import { OrderFields } from '../models/order'
import { ordersService } from '../services'

export interface IOrdersFilter {
  userEmail?: string
  itemName?: string
}

const createOrder = async (req: Request, res: Response) => {
  const orderBody: OrderFields = req.body

  const order = await ordersService.create(orderBody)

  res.send(order)
}

const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params

  const order = await ordersService.getById(id)

  res.send(order)
}

const getOrders = async (req: Request, res: Response) => {
  const { userEmail, itemName } = req.query

  const limit = req.query.limit as string

  const filter: IOrdersFilter = {}

  if (userEmail) filter.userEmail = userEmail as string
  if (itemName) filter.itemName = itemName as string

  const orders = await ordersService.getOrders(filter, limit)

  res.send(orders)
}

export { createOrder, getOrderById, getOrders }
