import {
  connect as MongooseConnect,
  disconnect as MongooseDisconnect,
} from './setupMongoose'

before(async () => {
  await MongooseConnect()
})

after(async () => {
  await MongooseDisconnect()
})
