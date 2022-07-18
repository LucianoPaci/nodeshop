import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer: MongoMemoryServer
const connect = async () => {
  console.log('Connecting Mongo...')
  mongoServer = await MongoMemoryServer.create()
  const randomName = (Math.random() + 1).toString(36).substring(7)
  const mongoUri = mongoServer.getUri(randomName)
  return mongoUri
}
const disconnect = async () => {
  console.log(`Stopping mongo...`)
  await mongoServer.stop()
}

export { connect, disconnect }
