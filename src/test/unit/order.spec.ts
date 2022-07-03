import { expect } from 'chai'
import { model as OrderModel, Order, OrderFields } from '../../models/order'

beforeEach(() => {
  console.log('START ORDERS')
})
afterEach(() => {
  console.log('END ORDERS')
})
describe('Test Orders', () => {
  it('Testing Order', () => {
    const rawOrder: OrderFields = {}

    expect(1).to.be.eq(1)
  })
})
