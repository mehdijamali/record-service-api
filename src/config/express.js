const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const cors = require('cors');
const { ValidationError } = require('express-validation');
const helmet = require('helmet');

const routes = require('../api/routes/v1');
const logger = require('./logger')(__filename.replace(`${__dirname}`, ''));

const app = express();

app.use(morgan('tiny'));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api v1 routes
app.use('/api/v1', routes);

// handle validation errors
app.use((err, req, res, next) => {
  next();
  if (err instanceof ValidationError) {
    return res
      .status(err.statusCode)
      .json({ code: err.statusCode, msg: err.details.body[0].message });
  }

  return res.status(500).json({ code: 500, msg: 'Internal Server Error' });
});

process.on('unhandledRejection', (error) => {
  logger.error(error.message);
});

process.on('uncaughtException', (error) => logger.error(error.message));

module.exports = app;
