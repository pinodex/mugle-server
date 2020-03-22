const Boom = require('@hapi/boom');

const prepareDetails = (details) => details.map((detail) => ({
  field: detail.path.join('.'),
  message: detail.message,
}));

/**
 * Validation fail action handler
 *
 * @param  {Object} request
 * @param  {Object} h
 * @param  {Object} error
 * @return {Object}
 */
module.exports = async (request, h, error) => {
  const boom = Boom.notAcceptable(null);

  boom.output.payload.details = prepareDetails(error.details);

  return boom;
};
