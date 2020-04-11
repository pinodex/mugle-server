const Joi = require('@hapi/joi');

module.exports = Joi.object({
  url: Joi
    .string()
    .required(),

  urls: Joi
    .array()
    .items(Joi.string())
    .allow(null),

  maxRateKbps: Joi
    .number()
    .allow(null),

  username: Joi
    .string()
    .allow(null),

  credential: Joi
    .string()
    .allow(null),
});
