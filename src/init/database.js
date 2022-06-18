const mongoose = require('mongoose')
const readConfig = require('./config')
const { log } = require('winston')

const config = readConfig()

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully')
})
mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected successfully')
})
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected successfully')
})
mongoose.connection.on('close', () => {
  console.log('MongoDB closed successfully')
})
mongoose.connection.on('error', (err) => {
  console.log(`MongoDB error: ${err}`)
  process.exit(1)
})

module.exports = async function () {
  try {
    await mongoose.connect(config.db_uri)
    log('info', `Connected to DB: ${mongoose.connection.name}`)
  } catch (error) {
    log('error', error)
    throw new Error(error.message)
  }
}
