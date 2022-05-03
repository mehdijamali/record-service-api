const { createLogger, transports } = require('winston');
const winston = require('winston');

const myFormat = winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);

const logger = (namespace) => createLogger({
  level: process.env.WINSTON_LOG_LEVEL || 'info',
  format: winston.format.combine(winston.format.timestamp(), myFormat),
  transports: [new transports.Console()],
  exceptionHandlers: [new transports.Console()],
  rejectionHandlers: [new transports.Console()],
  exitOnError: false,
  defaultMeta: { ...(namespace ? { namespace } : {}) },
});

module.exports = logger;
