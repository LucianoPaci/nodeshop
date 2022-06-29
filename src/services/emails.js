const nodemailer = require('nodemailer')
const get = require('lodash/get')
const Email = require('../models/email')
const emailMapper = require('../helpers/emailMapper')
import readConfig from '../init/config'
import logger from '../init/logger'

const config = readConfig()

const findEmails = async (filter, limit) => {
  return Email.find(filter).limit(limit)
}

const createEmail = async (body) => {
  return Email.create(body)
}

const sendEmail = async (body) => {
  let transport = nodemailer.createTransport({
    host: get(config, 'mailtrap.host'),
    port: get(config, 'mailtrap.port'),
    auth: {
      user: get(config, 'mailtrap.auth.user'),
      pass: get(config, 'mailtrap.auth.pass'),
    },
  })

  const emailMessage = emailMapper(body)

  try {
    const res = await transport.sendMail(emailMessage)
    logger.info(`EmailsService | INFO: ${res.messageId}`)
    return res
  } catch (error) {
    logger.error(`EmailService | ERROR: ${error}`)
    return error
  }
}

module.exports = {
  findEmails,
  createEmail,
  sendEmail,
}
