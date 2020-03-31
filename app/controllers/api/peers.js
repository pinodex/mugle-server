/**
 * Session controller
 */

const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

Joi.objectId = require('joi-objectid')(Joi);

const peerService = require('@services/peer');
const { PeerNotFound } = require('@services/peer/errors');

/**
 * Get peer
 *
 * @type {Object}
 */
exports.get = {
  options: {
    validate: {
      params: Joi.object({
        id: Joi
          .objectId()
          .required(),
      }),
    },
  },

  async handler(request) {
    const { id } = request.params;

    try {
      const peer = await peerService.get(id);

      return peer;
    } catch (error) {
      if (error instanceof PeerNotFound) {
        return Boom.notFound(error);
      }

      throw error;
    }
  },
};
