/**
 * Session controller
 */

const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

Joi.objectId = require('joi-objectid')(Joi);

const peerService = require('@services/peer');
const { PeerNotFound, PeerExpired } = require('@services/peer/errors');

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

/**
 * Create peer
 * @type {Object}
 */
exports.create = {
  async handler() {
    const id = await peerService.create();

    return {
      id,
    };
  },
};

/**
 * Refresh peer
 * @type {Object}
 */
exports.refresh = {
  options: {
    validate: {
      params: Joi.object({
        id: Joi
          .objectId()
          .required(),
      }),
    },
  },

  async handler(request, h) {
    const { id } = request.params;

    try {
      await peerService.refresh(id);
    } catch (error) {
      if (error instanceof PeerNotFound) {
        return Boom.notFound(error);
      }

      if (error instanceof PeerExpired) {
        return Boom.notAcceptable(error);
      }

      throw error;
    }

    return h.response(null).code(204);
  },
};
