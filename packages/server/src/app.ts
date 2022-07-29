import init from './init'

const setupApp = () => {
  Promise.resolve(init())
}

const setupServer = () => {
  setupApp()
}

setupServer()
