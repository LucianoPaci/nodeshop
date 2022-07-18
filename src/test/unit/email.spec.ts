import { expect } from 'chai'
import mongoose from 'mongoose'
import { model as EmailModel, Email } from '../../models/email'

describe('Failing Operations', () => {
  it('Creation should fail when trying to create email without data', async () => {
    const email: Email = new EmailModel()
    try {
      await email.save()
    } catch (error) {
      expect(error).to.be.an.instanceof(mongoose.Error.ValidationError)
    }
  })
  it('Creation should fail when 1 or more required parameters are missing', async () => {
    const email: Email = new EmailModel()
    email.from = 'john@mail.com'
    email.to = 'betty@mail.com'
    email.subject = 'Email Subject 1'

    try {
      await email.save()
    } catch (error) {
      expect(error).to.be.an.instanceof(mongoose.Error.ValidationError)
      expect(error.message).to.contain('html')
    }
  })
})
