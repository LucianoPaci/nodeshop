/* eslint-disable quotes */

import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import httpStatus from 'http-status'
import morgan from 'morgan'

import readConfig from './config'
import routes from '../routes/v1'
import ApiError from '../utils/ApiError'
import MongoDB from './database'
import { initQueues } from './queue'

const config = readConfig()

export default async function init() {
  const app = express()

  // set security HTTP headers
  app.use(helmet())

  // set cors
  app.use(
    cors({
      origin: '*',
    })
  )

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
  app.use((req: Request, res: Response, next: NextFunction) => {
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

  const unexpectedErrorHandler = (error: any) => {
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
