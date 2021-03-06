const { ValidationError } = require('express-validation');
const logger = require('../../config/logger')(__filename.replace(`${__dirname}`, ''));

module.exports = (err, req, res, next) => {
  next();
  logger.error(err.message, err);
  if (err instanceof ValidationError) {
    return res
      .status(err.statusCode)
      .json({ code: err.statusCode, msg: err.details.body[0].message });
  }
  return res.status(500).json({ code: 500, msg: 'Internal Server Error' });
};
