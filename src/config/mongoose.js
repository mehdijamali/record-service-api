const mongoose = require('mongoose');
const logger = require('./logger')(__filename.replace(`${__dirname}`, ''));
const { dbUri } = require('./vars');

exports.connect = () => {
  logger.info(`Connecting to ${dbUri} ...`);
  mongoose
    .connect(dbUri, {
      keepAlive: true,
      useNewUrlParser: true,
    })
    .then(() => {
      logger.info('Mongoose connected!');
    });
  return mongoose.connection;
};
