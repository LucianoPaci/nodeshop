const winston = require('winston')
const config = require('./config')

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack })
  }
  return info
})

function init() {
  winston.createLogger({
    level: config.env === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
      enumerateErrorFormat(),
      config.env === 'development'
        ? winston.format.colorize()
        : winston.format.uncolorize(),
      winston.format.splat(),
      winston.format.printf(({ level, message }) => `${level}: ${message}`),
      winston.format.colorize({ all: true })
    ),
    transports: [
      new winston.transports.Console({
        stderrLevels: ['errors'],
      }),
    ],
  })
}

module.exports = init
