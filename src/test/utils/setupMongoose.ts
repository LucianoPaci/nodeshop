import mongoose from 'mongoose'
import {
  connect as connectMongo,
  disconnect as disconnectMongo,
} from './setupMongo'

const connect = async (options = {}, onConnect: any = null) => {
  const mongoUri = await connectMongo()

  await mongoose.connect(mongoUri, options, async (error) => {
    if (error) {
      throw error
    }
    console.log(`Running mongo on ${mongoUri}`)
    if (onConnect) {
      await onConnect(mongoUri)
    }
  })
}

const disconnect = async () => {
  console.log(`Disconnecting mongoose...`)
  await mongoose.disconnect()
  await disconnectMongo()
}

export { connect, disconnect }
