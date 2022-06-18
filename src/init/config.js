const { dump, load } = require('js-yaml')
const { accessSync } = require('fs')
const { join } = require('path')
const nconf = require('nconf')

const configRoot = 'config'

module.exports = function readConfig() {
  const defaultConfigPath = join(configRoot, 'default.yaml')
  try {
    accessSync(defaultConfigPath)
  } catch (error) {
    // default config file is not accessible, throw an error
    throw new Error('Default config file not found')
  }

  const environment = process.env.NODE_ENV || 'development'

  // environment-specific config
  const envConfigPath = join(configRoot, `${environment}.yaml`)

  const yamlFormat = {
    parse: load,
    stringify: dump,
  }

  nconf
    .argv()
    .env()
    .file('fileEnv', {
      file: envConfigPath,
      format: yamlFormat,
    })
    .file('fileDefault', {
      file: defaultConfigPath,
      format: yamlFormat,
    })

  const port = Number(process.env.PORT) || Number(nconf.get('port')) || 3000
  return {
    environment: environment,
    port: port,
    logger: nconf.get('logger'),
    db_uri: nconf.get('db_uri'),
    sqs: nconf.get('sqs'),
  }
}
