const Peer = require('@models/peer');
const { PeerNotFound } = require('./errors');

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

  peer.lastRefresh = new Date();

  await peer.save();
};
