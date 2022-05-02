const app = require('./config/express');
const { port } = require('./config/vars');
const Logger = require('./config/logger');

const logger = Logger(__filename.replace(`${__dirname}`, ''));

// Listen to the requests
const server = app.listen(port, '0.0.0.0', () => logger.ino(`Server started on port ${port}`));

module.exports = server;
