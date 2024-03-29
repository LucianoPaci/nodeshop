import { Request, Response } from 'express'
import { OrderFields } from '@lucianopaci/nodeshop-types'
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
  const sort = req.query.sort as string

  const filter: IOrdersFilter = {}

  if (userEmail) filter.userEmail = userEmail as string
  if (itemName) filter.itemName = itemName as string

  const orders = await ordersService.getOrders(filter, limit, sort)

  res.send(orders)
}

const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body

  const updated = await ordersService.updateOrder(id, status)
  res.send(updated)
}

export { createOrder, getOrderById, getOrders, updateOrder }
