import { expect } from 'chai'
import mongoose from 'mongoose'
import { model as OrderModel, Order } from '../../models/order'

/**
 * Failure Runs
 */

describe('Failing Operations', () => {
  it('Creation should fail when trying to create order without data', async () => {
    const order: Order = new OrderModel()
    try {
      await order.save()
    } catch (error) {
      console.log(
        '🚀 ~ file: order.spec.ts ~ line 22 ~ it ~ error',
        error.message
      )
      expect(error).to.be.an.instanceof(mongoose.Error.ValidationError)
    }
  })
  it('Creation should fail when 1 or more required parameters are missing', async () => {
    const order: Order = new OrderModel()
    order.itemName = 'Item Test'
    order.itemPrice = '120.30'
    order.itemsQuantity = 3

    try {
      await order.save()
    } catch (error) {
      expect(error).to.be.an.instanceof(mongoose.Error.ValidationError)
      expect(error.message).to.contain('userEmail')
    }
  })
})

/**
 * Successful Runs
 */
describe('Successful Operations', () => {
  it('Successful Creation of an Order', async () => {
    const order: Order = new OrderModel()

    order.userEmail = 'pepito@zenvia.com'
    order.itemName = 'Item Test'
    order.itemPrice = '120.30'
    order.itemsQuantity = 3

    await order.save()

    const orderInDB: Order | null = await OrderModel.findOne({
      userEmail: 'pepito@zenvia.com',
    }).exec()
    console.log('Order Document found in memory-db', orderInDB)

    expect(orderInDB?.userEmail).to.be.eq(order.userEmail)
  })
})
