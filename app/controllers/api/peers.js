/**
 * Session controller
 */

const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

Joi.objectId = require('joi-objectid')(Joi);

const peerService = require('@services/peer');
const { PeerNotFound } = require('@services/peer/errors');

exports.create = {
  async handler() {
    const id = await peerService.create();

    return {
      id,
    };
  },
};

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
        return Boom.notFound(error.message);
      }

      throw error;
    }

    return h.response(null).code(204);
  },
};
