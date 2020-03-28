const Peer = require('@models/peer');
const { PeerNotFound, PeerExpired } = require('./errors');

/**
 * Get peer
 *
 * @param  {String} id Peer ID
 * @return {Peer}
 */
exports.get = async (id) => {
  const peer = await Peer.findById(id);

  if (!peer) {
    throw new PeerNotFound();
  }

  return peer;
};

/**
 * Create Peer
 *
 * @return {String} Peer ID
 */
exports.create = async () => {
  const peer = await Peer.create({
    lastRefresh: new Date(),
  });

  return peer._id;
};

/**
 * Refresh Peer
 *
 * @param  {String} id Peer ID
 */
exports.refresh = async (id) => {
  const peer = await Peer.findById(id);

  if (!peer) {
    throw new PeerNotFound();
  }

  if (peer.isExpired) {
    throw new PeerExpired();
  }

  peer.lastRefresh = new Date();

  await peer.save();
};
