const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('../api/routes/v1');
const errorMiddleware = require('../api/middleware/error');

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
app.use(errorMiddleware);

module.exports = app;
