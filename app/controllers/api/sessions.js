/**
 * Session controller
 */

const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const sessionService = require('@services/session');

const sessionSchema = Joi.object({
  peerId: Joi
    .string()
    .min(8)
    .max(16)
    .required()
});

/**
 * Get session
 * @type {Object}
 */
exports.get = {
  options: {
    validate: {
      params: Joi.object({
        id: Joi
          .string()
          .guid()
          .required()
      })
    }
  },

  async handler(request) {
    const { id } = request.params;

    const exists = await sessionService.exists(id);

    if (!exists) {
      return Boom.notFound('Session not found');
    }

    const peers = await sessionService.get(id);

    return { id, peers };
  }
}

/**
 * Create session
 * @type {Object}
 */
exports.create = {
  options: {
    validate: {
      payload: sessionSchema
    }
  },

  async handler(request) {
    const { peerId } = request.payload;

    const id = await sessionService.addPeer(peerId);
    const peers = await sessionService.get(id);

    return { id, peers }
  }
}

/**
 * Add peer to session
 * @type {Object}
 */
exports.addPeer = {
  options: {
    validate: {
      params: Joi.object({
        id: Joi
          .string()
          .guid()
          .required()
      }),

      payload: sessionSchema
    }
  },

  async handler(request) {
    const { id } = request.params;
    const { peerId } = request.payload;

    const exists = await sessionService.exists(id);

    if (!exists) {
      return Boom.notFound('Session not found');
    }

    await sessionService.addPeer(peerId, id);

    const peers = await sessionService.get(id);

    return { id, peers }
  }
}
