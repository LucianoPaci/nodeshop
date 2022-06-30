import nodemailer  from 'nodemailer'
import get  from 'lodash/get'
import {EmailFields, EmailWithOrder, model as Email} from '../models/email'
import emailMapper from '../helpers/emailMapper'
import readConfig from '../init/config'
import logger from '../init/logger'

const config = readConfig()

const findEmails = async (filter: any, limit: number | string) => {
  const parsedLimit = typeof limit === 'string' ? parseInt(limit) : limit
  return Email.find(filter).limit(parsedLimit)
}

const createEmail = async (body: EmailFields | EmailWithOrder): Promise<EmailWithOrder> => {
  return Email.create(body)
}

const sendEmail = async (body: EmailWithOrder) => {
  let transport = nodemailer.createTransport({
    host: get(config, 'mailtrap.host'),
    port: get(config, 'mailtrap.port'),
    auth: {
      user: get(config, 'mailtrap.auth.user'),
      pass: get(config, 'mailtrap.auth.pass'),
    },
  })

  try {
    const res = await transport.sendMail(body)
    logger.info(`EmailsService | INFO: ${res.messageId}`)
    return res
  } catch (error) {
    logger.error(`EmailService | ERROR: ${error}`)
    return error
  }
}

export {
  findEmails,
  createEmail,
  sendEmail,
}
