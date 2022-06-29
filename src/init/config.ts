import { dump, load } from 'js-yaml'
import { accessSync } from 'fs'
import { join } from 'path'
import nconf from 'nconf'

const configRoot = 'config'

export default function readConfig() {
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

  const port = Number(process.env.PORT) || Number(nconf.get('PORT')) || 3000
  return {
    environment: environment,
    port: port,
    logger: nconf.get('LOGGER'),
    db_uri: nconf.get('DB_URI'),
    sqs: {
      region: nconf.get('SQS_REGION'),
      accessKeyId: nconf.get('SQS_ACCESS_KEY_ID'),
      secretAccessKey: nconf.get('SQS_SECRET_ACCESS_KEY'),
      orders_queue: {
        url: nconf.get('SQS_ORDERS_QUEUE_URL'),
        consumers: nconf.get('SQS_ORDERS_QUEUE_CONSUMERS'),
      },
    },

    mailtrap: {
      host: nconf.get('MAILTRAP_HOST'),
      port: nconf.get('MAILTRAP_PORT'),
      auth: {
        user: nconf.get('MAILTRAP_AUTH_USER'),
        pass: nconf.get('MAILTRAP_AUTH_PASS'),
      },
    },
  }
}
