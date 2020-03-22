const uuid = require('uuid');
const redis = require('@services/redis');

/**
 * Generate session ID
 * @return {String}
 */
function generateId() {
  return uuid.v4();
}

/**
 * Get session peers
 *
 * @param  {String} id Session ID
 * @return {Array}
 */
exports.get = async (id) => {
  const peerIds = await redis.smembers(id);

  return peerIds;
};

/**
 * Check if session ID exists
 *
 * @param  {String} id Session ID
 * @return {Boolean}
 */
exports.exists = async (id) => {
  const response = await redis.exists(id);

  return response === 1;
};

/**
 * Add new peer to session
 *
 * @param  {String} peerId Peer ID
 * @param  {String} sessionId Session ID
 * @return {String} Session ID
 */
exports.addPeer = async (peerId, sessionId = null) => {
  const id = sessionId || generateId();

  await redis.sadd(id, String(peerId));

  return id;
};
