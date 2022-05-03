const app = require('./config/express');
const { port } = require('./config/vars');
const logger = require('./config/logger')(
  __filename.replace(`${__dirname}`, ''),
);
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// Listen to the requests
const server = app.listen(port, '0.0.0.0', () => logger.ino(`Server started on port ${port}`));
process.on('unhandledRejection', (error) => {
  logger.error(error.message);
});

process.on('uncaughtException', (error) => logger.error(error.message));

module.exports = server;
