import * as AWS from 'aws-sdk'
import { Consumer } from 'sqs-consumer'
import isObject from 'lodash/isObject'
import get from 'lodash/get'
const emailMapper = require('../helpers/emailMapper')
import readConfig from './config'
import logger from './logger'
import { OrderFields } from '../models/order'

const config = readConfig()
const sqsConfig = {
  accessKeyId: get(config, 'sqs.accessKeyId'),
  secretAccessKey: get(config, 'sqs.secretAccessKey'),
  region: get(config, 'sqs.region'),
  apiVersion: '2012-11-05',
}

// Queue Instances
const queueInstances = new Map()

function initQueues() {
  // Initialize Publishers and make them available
  const publisherQueueNames = ['orders_queue']
  publisherQueueNames.forEach((publisherQueueName: string) => {
    createQueuePublisher(publisherQueueName)
  })

  // Initialize Consumers TODO
  const consumersQueueNames = ['orders_queue']
  consumersQueueNames.forEach((consumerQueueName: string) => {
    createQueueConsumer(consumerQueueName, receiveMessage)
  })
}

function createQueuePublisher(queueName: string) {
  const queueUrl = get(config, `sqs.${queueName}.url`)
  const sqs = new AWS.SQS(sqsConfig)

  if (!queueInstances.has(queueName)) {
    queueInstances.set(queueName, sqs)
  }

  logger.info(
    `[SQS ${queueName}] Connected - Ready to publish in queue ${queueUrl} `
  )
}

// Improve Handler type
function createQueueConsumer(queueName: string, handler: any) {
  const queueUrl = get(config, `sqs.${queueName}.url`)
  const sqs = new AWS.SQS(sqsConfig)

  if (!queueInstances.has(queueName)) {
    queueInstances.set(queueName, sqs)
  }

  // const consumersAmount = get(config, `sqs.${queuName}.consumers`) || 1

  const consumer = Consumer.create({
    queueUrl,
    sqs: queueInstances.get(queueName),
    handleMessage: async (message) => {
      try {
        message.Body = (message.Body && JSON.parse(message.Body)) || {}
      } catch (error) {
        error.message = `Invalid JSON on queue ${queueName}'s message`
        error.queueMessage = message
        throw error
      }

      try {
        await handler(message, queueName)
      } catch (error) {
        throw error
      }
    },
  })

  consumer.on('error', (err) => {
    logger.error(`[SQS ${queueName}] Consumer Error: "${err.name}"`)
    console.log(err)
  })
  consumer.on('processing_error', (err) => {
    logger.error(`[SQS ${queueName}] Processing Error: "${err.name}"`)
    console.log(err)
  })
  consumer.on('message_received', (message) => {
    logger.debug(`[SQS ${queueName}] Message Received: "${message.MessageId}"`)
  })
  consumer.on('message_processed', (message) => {
    logger.debug(`[SQS ${queueName}] Message Processed: "${message.MessageId}"`)
  })

  consumer.start()
  logger.info(`[SQS ${queueName}] Listening queue "${queueUrl}`)

  process.on('exit', () => {
    logger.info(`[SQS ${queueName}] Stopping queue`)
    consumer.stop()
  })
}

// NOTE: I tried to move this function to a different file, but for some reason, I couldnt get to
// obtain the functions on runtime

// Improve parameters types
const sendMessageToQueue = (queueName: string, messageBody: OrderFields, orderData: any): Promise<void> => {
  if (!queueName) {
    throw new Error(`MISSING_PARAMETER: ${queueName} is required`)
  }
  if (!isObject(messageBody)) {
    throw new Error(`INVALID_FORMAT: ${messageBody} should be an object`)
  }

  // Get the instance
  const sqs = queueInstances.get(queueName)

  // Get the URL
  const queueUrl = get(config, `sqs.${queueName}.url`)

  // Get the body
  const messageBodyString = JSON.stringify({
    ...messageBody,
    orderId: orderData._id,
  })

  if (!sqs) {
    throw new Error('There is no SQS configured')
  }

  const params = {
    MessageBody: messageBodyString,
    MessageDeduplicationId: JSON.stringify(messageBody.userEmail),
    QueueUrl: queueUrl,
    MessageGroupId: `${queueName}_service`,
  }

  return new Promise<void>((resolve, reject) => {
    sqs.sendMessage(params, (err:any, data:any) => {
      if (err) {
        logger.error(
          `Error while sending a message to the queue: ${err.message}`
        )
        reject()
      } else {
        logger.info(`Message sent to the queue: Body: ${messageBodyString}`)
        resolve()
      }
    })
  })
}

// NOTE: I tried to move this function to a different file, but for some reason, I couldnt get to
// obtain the functions on runtime
const receiveMessage = async (message:any, queueName:string) => {
  const { emailsService } = require('../services') // HOISTING https://developer.mozilla.org/es/docs/Glossary/Hoisting
  logger.info(
    `[SQS ${queueName}] Message Received - Body: ${JSON.stringify(
      message.Body
    )}`
  )
  try {
    const mappedEmail = emailMapper(message.Body)
    await emailsService.createEmail(mappedEmail)
    logger.info('-- Email Created in DB --')
    await emailsService.sendEmail(mappedEmail)
    logger.info('-- Email Sent to Mailtrap --')
  } catch (error) {
    throw error
  }
}

export {
  queueInstances,
  initQueues,
  sendMessageToQueue,
  receiveMessage,
}