import { expect } from 'chai'

beforeEach(() => {
  console.log('START EMAILS')
})

afterEach(() => {
  console.log('END EMAILS')
})

describe('Test Emails', () => {
  it('Testing Email', () => {
    expect(2).to.be.eq(2)
  })
})
