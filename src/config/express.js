const express = require('express');
const morgan = require('morgan');

const { ValidationError } = require('express-validation');

const app = express();
app.use(morgan('tiny'));

app.use((err, req, res, next) => {
  next();
  if (err instanceof ValidationError) {
    return res
      .status(err.statusCode)
      .json({ code: err.statusCode, msg: err.details.body[0].message });
  }

  return res
    .status(500)
    .json({ code: err.statusCode, msg: 'Internal Server Error' });
});

module.exports = app;
