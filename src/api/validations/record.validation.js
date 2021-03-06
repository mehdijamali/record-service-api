const Joi = require('joi');

module.exports = {
  // POST /v1/records
  getRecords: {
    body: Joi.object().keys({
      startDate: Joi.date().iso(),
      endDate: Joi.date().iso(),
      minCount: Joi.number().integer(),
      maxCount: Joi.number().integer(),
    }),
  },
};
