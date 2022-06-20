const AWS = require('aws-sdk')
const logger = require('./logger')
const readConfig = require('./config')
const { Consumer } = require('sqs-consumer')
const get = require('lodash/get')
const isObject = require('lodash/isObject')

const config = readConfig()

// Configure the region
AWS.config.update({ region: config.sqs.region })

// Queue Instances
const queueInstances = new Map()

function initQueues() {
  // Initialize Publishers and make them available
  const publisherQueueNames = ['orders_queue']
  publisherQueueNames.forEach((publisherQueueName) => {
    createQueuePublisher(publisherQueueName)
  })

  // Initialize Consumers TODO
  const consumersQueueNames = ['orders_queue']
  consumersQueueNames.forEach((consumerQueueName) => {
    createQueueConsumer(consumerQueueName, receiveMessage)
  })
}

function createQueuePublisher(queueName) {
  const queueUrl = get(config, `sqs.${queueName}.url`)
  const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })

  if (!queueInstances.has(queueName)) {
    queueInstances.set(queueName, sqs)
  }

  logger.info(
    `[SQS ${queueName}] Connected - Ready to publish in queue ${queueUrl} `
  )
}

function sendMessageToQueue(queueName, messageBody) {
  if (!queueName) {
    throw new Error('MISSING_PARAMETER', `${queueName} is required`)
  }
  if (!isObject(messageBody)) {
    throw new Error('INVALID_FORMAT', `${messageBody} should be an object`)
  }

  // Get the instance
  const sqs = queueInstances.get(queueName)

  // Get the URL
  const queueUrl = get(config, `sqs.${queueName}.url`)

  // Get the body
  const messageBodyString = JSON.stringify(messageBody)

  if (!sqs) {
    throw new Error('There is no SQS configured')
  }

  const params = {
    MessageBody: messageBodyString,
    MessageDeduplicationId: JSON.stringify(messageBody.userEmail),
    QueueUrl: queueUrl,
    MessageGroupId: `${queueName}_service`,
  }

  return new Promise((resolve, reject) => {
    sqs.sendMessage(params, (err, data) => {
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

function createQueueConsumer(queueName, handler) {
  const queueUrl = get(config, `sqs.${queueName}.url`)
  const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })

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
    logger.error(`[SQS ${queueName}] Consumer Error: "${err.name}"`), err
  })
  consumer.on('processing_error', (err) => {
    logger.error(`[SQS ${queueName}] Processing Error: "${err.name}"`), err
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

function receiveMessage(message, queueName) {
  logger.info(`[SQS ${queueName}] - Body: ${JSON.stringify(message.Body)}`)
}

module.exports = {
  queueInstances,
  initQueues,
  sendMessageToQueue,
}