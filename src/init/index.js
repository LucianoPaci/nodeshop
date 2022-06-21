const express = require('express')
const helmet = require('helmet')
const httpStatus = require('http-status')
const morgan = require('morgan')

const readConfig = require('./config')
const routes = require('../routes/v1')
const ApiError = require('../utils/ApiError')
const MongoDB = require('./database')
const { initQueues } = require('./queue')

const config = readConfig()
console.log('🚀 ~ file: index.js ~ line 13 ~ config', config)

module.exports = async function init() {
  const app = express()

  // set security HTTP headers
  app.use(helmet())

  // parse json request body
  app.use(express.json())

  // Initialize Morgan (HTTP Logs Middleware)
  app.use(morgan('dev'))

  // Initialize DB
  await MongoDB()

  // Initialize API
  app.use('/v1', routes)
  // Initialize Queues
  initQueues()

  // Send Back 404 for any unknown api request
  app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'))
  })

  const server = app.listen(config.port, () => {
    console.log(
      `==============================\n` +
        `App    : NodeShop\n` +
        `Port   : ${config.port}\n` +
        `Env    : ${config.environment}\n` +
        `==============================`
    )
  })

  // Exit Handlers
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server Closed')
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  }

  const unexpectedErrorHandler = (error) => {
    console.error(error)
    exitHandler()
  }

  process.on('unhandledRejection', unexpectedErrorHandler)
  process.on('uncaughtException', unexpectedErrorHandler)

  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received')
    if (server) server.close()
  })
}
