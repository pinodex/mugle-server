/**
 * Ice server controller
 */

const iceServerService = require('@services/ice-server');

/**
 * Get all ice servers
 *
 * @type {Object}
 */
exports.all = {
  async handler() {
    const list = await iceServerService.all();

    return list;
  },
};
