const Peer = require('@models/peer');
const { PeerNotFound, PeerExpired } = require('@services/peer/errors');
const { PEER_LIFETIME_SECONDS } = require('@models/constants');

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
 * @param {String} socketID Socket ID
 * @return {String} Peer ID
 */
exports.create = async (socketId) => {
  const peer = await Peer.create({
    socketId,
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

/**
 * Refresh Peer by socket ID
 *
 * @param  {String} socketId Socket ID
 */
exports.refreshBySocketId = async (socketId) => {
  const peer = await Peer.findOne({ socketId }).exec();

  if (!peer) {
    throw new PeerNotFound();
  }

  if (peer.isExpired) {
    throw new PeerExpired();
  }

  peer.lastRefresh = new Date();

  await peer.save();
};

/**
 * Remove Peer by socket ID
 *
 * @param  {String} socketId Socket ID
 */
exports.deleteBySocketId = async (socketId) => {
  await Peer.deleteOne({ socketId });
};

/**
 * Set peers occupied status to true
 *
 * @param  {...String} peerIds Peer IDs
 */
exports.occupy = async (...peerIds) => {
  const query = {
    _id: {
      $in: peerIds,
    },
  };

  const doc = {
    isOccupied: true,
  };

  await Peer.updateMany(query, doc);
};

/**
 * Find vacant Peers
 *
 * @return {Peer}
 */
exports.findVacants = async () => {
  const lifetimeThreshold = new Date(new Date() - PEER_LIFETIME_SECONDS);

  const peers = await Peer.find({
    isOccupied: false,

    lastRefresh: {
      $gt: lifetimeThreshold,
    },
  });

  return peers;
};
