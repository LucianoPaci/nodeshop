const init = require('./init')

const setupApp = () => {
  Promise.resolve(init())
}

const setupServer = () => {
  setupApp()
}

setupServer()
